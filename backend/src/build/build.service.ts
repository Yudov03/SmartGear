import { ForbiddenException, Injectable } from '@nestjs/common';
import { BuildDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as math from 'mathjs';
import { Engine } from '@prisma/client';

@Injectable()
export class BuildService {
  constructor(private prisma: PrismaService) {}
  // Nhap vao P va n tinh ra P_ct va n_sb
  async calculateEngine(dto: BuildDto) {
    dto.P_ct = dto.P / (0.955 * 0.96 * 0.97 * 0.99 ** 3);
    dto.n_sb = dto.n * 37.5;
    const engines = await this.prisma.engine.findMany({
      where: {
        P_dc: {
          gte: dto.P_ct,
        },
      },
    });
    function loss_func(item: Engine, dto: BuildDto) {
      return math.abs(item.n_dc - dto.n_sb) / dto.n_sb;
    }
    engines.sort((a, b) => loss_func(a, dto) - loss_func(b, dto));
    return [engines, dto];
  }
  // nhap vao dto tu output o tren va chon dong co return dto
  async transmissionRate(engineId: number, dto: BuildDto) {
    const item = await this.prisma.engine.findFirst({
      where: {
        id: engineId,
      },
    });
    if (!item) throw new ForbiddenException('Access to resources denied');
    dto.P_real = item.P_dc;
    dto.n_real = item.n_dc;
    dto.u_d = 4;
    const u_h = dto.n_real / dto.n / dto.u_d;

    const a = 18.67393;
    const b = Math.pow(u_h, 2);
    const c = Math.pow(u_h, 3);
    // Định nghĩa hàm và đạo hàm
    const f = (x: number): number => {
      return a * Math.pow(x, 4) - b * x - c;
    };

    const df = (x: number): number => {
      return 4 * a * Math.pow(x, 3) - b;
    };

    // Triển khai phương pháp Newton-Raphson
    const newtonRaphson = (
      f: (x: number) => number,
      df: (x: number) => number,
      x0: number,
      tol: number = 1e-8,
      maxIter: number = 100,
    ): number => {
      let x = x0;
      for (let i = 0; i < maxIter; i++) {
        const fx = f(x);
        const dfx = df(x);

        if (Math.abs(fx) < tol) break;
        if (dfx === 0) throw new Error('Đạo hàm bằng 0 - Không thể tiếp tục');

        x = x - fx / dfx;
      }
      return x;
    };

    dto.u_brc = newtonRaphson(f, df, 3);
    dto.u_brt = u_h / dto.u_brc;

    dto.P_real = 7.5;
    dto.P1 = dto.P_real * 0.99 * 0.955;
    dto.P2 = dto.P1 * 0.99 * 0.96;
    dto.P3 = dto.P2 * 0.99 * 0.955;

    dto.n_real = 2925;
    dto.u_kn = 1;
    dto.n1 = dto.n_real / dto.u_d;
    dto.n2 = dto.n1 / dto.u_brc;
    dto.n3 = dto.n2 / dto.u_brt;
    dto.n = dto.n3 / dto.u_kn;

    const temp = 9.55 * Math.pow(10, 6);

    dto.T_dc = temp * (dto.P_real / dto.n_real);
    dto.T1 = temp * (dto.P1 / dto.n1);
    dto.T2 = temp * (dto.P2 / dto.n2);
    dto.T3 = temp * (dto.P3 / dto.n3);
    dto.T_tt = dto.T3;

    return dto;
  }

  duongkinhbanhdai(dto: BuildDto) {
    dto.d1 = 160;
    dto.v1 = (Math.PI * dto.d1 * dto.n_real) / 60000;
    const hesotruot = 0.02;
    const u = 4;
    dto.d2 = dto.d1 * u * (1 - hesotruot);
    dto.d2 = Math.ceil(dto.d2) + 2;
    return dto;
  }

  khoangcachtruc(dto: BuildDto) {
    const temp = 0.95 * dto.d2;
    const h = 8;
    if (temp <= 2 * (dto.d1 + dto.d2) && temp >= h + 0.55 * (dto.d1 + dto.d2))
      dto.a = temp;
    dto.L =
      2 * dto.a +
      (Math.PI * (dto.d1 + dto.d2)) / 2 +
      Math.pow(dto.d2 - dto.d1, 2) / (4 * dto.a);
    const lambda = dto.L - (Math.PI * (dto.d1 + dto.d2)) / 2;
    const delta = (dto.d2 - dto.d1) / 2;
    const temp_2 = Math.pow(lambda, 2) - 8 * Math.pow(delta, 2);
    dto.a = (lambda + Math.sqrt(temp_2)) / 4;
    const check_alpha_1 = 180 - 57 * ((dto.d2 - dto.d1) / dto.a);
    if (check_alpha_1 > 120) {
      dto.alpha_1 = check_alpha_1;
    }
    return dto;
  }

  sodai(dto: BuildDto) {
    const right = (7.5 * 1.2) / (4.059 * 0.872 * 1.081 * 1.14 * 0.9575);
    dto.z = Math.ceil(right);
    return dto;
  }

  kichthuocbanhdai(dto: BuildDto) {
    //const t = 15;
    const e = 10;
    dto.B = (dto.z - 1) * 15 + 2 * e;
    const h0 = 3.3;
    dto.d_a_1 = dto.d1 + 2 * h0;
    dto.d_a_2 = dto.d2 + 2 * h0;
    return dto;
  }

  luctacdunglenbotruyen(dto: BuildDto) {
    const F_v = 63.049;
    const F_0 = (1 / dto.z) * ((780 * 7.5 * 1.2) / (24.504 * 0.872)) + F_v;
    dto.F_0_final = 3 * F_0;
    dto.P_real = 7.5;
    dto.F_t = (1000 * dto.P_real) / 24.504;
    dto.F_r = 2 * F_0 * dto.z * Math.sin((dto.alpha_1 * Math.PI) / (180 * 2));
    const z = (dto.alpha_1 * Math.PI) / 180;
    dto.f =
      (1 / z) *
      Math.log((2 * dto.F_0_final + dto.F_t) / (2 * dto.F_0_final - dto.F_t));
    return dto;
  }

  ungsuatmax(dto: BuildDto) {
    const tmp = (dto.alpha_1 * Math.PI) / 180;
    const phi_1 =
      (1000 * dto.P_real * Math.pow(Math.E, dto.f * tmp)) /
      (24.504 * 3 * 81 * (Math.pow(Math.E, dto.f * tmp) - 1));
    const phi_v = 1100 * Math.pow(24.54, 2) * Math.pow(10, -6);
    const phi_f_1 = (2 * 2.8 * 100) / dto.d1;
    dto.phi_max = phi_1 + phi_v + phi_f_1;
    dto.circle = 9.8;

    return dto;
  }

  calculateStep2(dto: BuildDto) {
    const duongkinhbanhdai = this.duongkinhbanhdai(dto);
    const khoangcachtruc = this.khoangcachtruc(duongkinhbanhdai);
    const sodai = this.sodai(khoangcachtruc);
    const kichthuocbanhdai = this.kichthuocbanhdai(sodai);
    const luctacdunglenbotruyen = this.luctacdunglenbotruyen(kichthuocbanhdai);
    const ungsuatmax = this.ungsuatmax(luctacdunglenbotruyen);
    return ungsuatmax;
  }

  banhdan(dto: BuildDto) {
    const R_e_tmp = 136.54;
    const d_e1_tmp = (2 * R_e_tmp) / Math.sqrt(Math.pow(2.97, 2) + 1);
    const K_be = 0.28;
    let z_1 = 30;
    const dm1_tmp = (1 - 0.5 * K_be) * d_e1_tmp;
    const mtm = dm1_tmp / z_1;
    const mte = Math.round(mtm / (1 - 0.5 * K_be));
    const mtm_tb = mte * (1 - 0.5 * K_be);
    z_1 = dm1_tmp / mtm;
    const z_2 = Math.round(2.97 * z_1);
    const i = z_2 / z_1;
    const deltau = (i - 2.97) / 2.97;
    if (deltau > 2 / 0.03) {
      throw new Error('Error');
    }
    dto.d_e1 = mte * z_1;
    dto.d_e2 = mte * z_2;
    dto.d_m1 = mtm_tb * z_1;
    dto.d_m2 = mtm_tb * z_2;
    dto.goc_1 = (Math.atan(z_1 / z_2) * 180) / Math.PI;
    dto.goc_2 = 90 - dto.goc_1;

    dto.h_ae1 = mte;
    dto.d_ae1 = dto.d_e1 + 2 * dto.h_ae1 * Math.cos(dto.goc_1);
    dto.d_ae2 = dto.d_e2 + 2 * dto.h_ae1 * Math.cos(dto.goc_2);
    dto.h_e = 2.2 * mte;
    dto.h_fe1 = dto.h_e - dto.h_ae1;

    dto.R_e = 0.5 * mte * Math.sqrt(Math.pow(z_1, 2) + Math.pow(z_2, 2));
    dto.b = K_be * dto.R_e;
    dto.R_m = dto.R_e - 0.5 * dto.b;

    dto.B_1 =
      dto.R_e * Math.cos((dto.goc_1 * Math.PI) / 180) -
      dto.h_ae1 * Math.sin((dto.goc_1 * Math.PI) / 180);
    dto.B_2 =
      dto.R_e * Math.cos((dto.goc_2 * Math.PI) / 180) -
      dto.h_ae1 * Math.sin((dto.goc_2 * Math.PI) / 180);

    dto.theta_f1 = (Math.atan(dto.h_fe1 / dto.R_e) * 180) / Math.PI;
    //dto.theta_f2 = dto.theta_f1;

    dto.goc_a1 = dto.goc_1 + dto.theta_f1;
    dto.goc_a2 = dto.goc_2 + dto.theta_f1;

    dto.goc_f1 = dto.goc_1 - dto.theta_f1;
    dto.goc_f2 = dto.goc_2 - dto.theta_f1;

    return dto;
  }

  calculateStep3(dto: BuildDto) {
    const banhdan = this.banhdan(dto);
    return banhdan;
  }

  banhchudong(dto: BuildDto) {
    dto.a_w = 225;
    const m = 3;
    const z1 = 33;
    const z2 = 116;
    dto.d1_cd = m * z1;
    dto.d2_cd = m * z2;
    dto.b_w = 0.25 * dto.a_w;
    dto.d_w1 = (2 * dto.a_w) / (3.52 + 1);
    dto.d_w2 = dto.d_w1 * 3.52;
    dto.d_a1 = dto.d1_cd + 2 * m;
    dto.d_a2 = dto.d2_cd + 2 * m;
    dto.d_f1 = dto.d1_cd - 2.5 * m;
    dto.d_f2 = dto.d2_cd - 2.5 * m;
    dto.profin = 20;
    dto.d_b1 = dto.d1_cd * Math.cos((20 * Math.PI) / 180);
    dto.d_b2 = dto.d2_cd * Math.cos((20 * Math.PI) / 180);
    dto.profin_rang = 20;
    dto.alpha_tw = 20;
    return dto;
  }

  calculateStep4(dto: BuildDto) {
    const banhchudong = this.banhchudong(dto);
    return banhchudong;
  }
}
