import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import { EditPasswordDto } from './dto/edit-password.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    return { message: 'Cập nhật thông tin thành công' };
  }

  async editPassword(userId: number, dto: EditPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const passwordValid = await argon.verify(user.pass, dto.oldPassword);
    if (!passwordValid) {
      throw new Error('Mật khẩu cũ không đúng');
    }
    const hashed = await argon.hash(dto.newPassword);
    await this.prisma.user.update({
      where: { id: userId },
      data: { pass: hashed },
    });
    return { message: 'Đổi mật khẩu thành công' };
  }
}
