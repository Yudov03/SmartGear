
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        const jwtSecret = config.get<string>("JWT_SECRET");
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        })
    }
    async validate(payload: {
        sub: number;
        email: string;
    }) {
        const user =
        await this.prisma.user.findUnique({
            where: {
            id: payload.sub,
            },
        });
        if (!user) {
            return null; // or throw new UnauthorizedException();
        }
        const { pass, ...result } = user;
        return result;
    }
}
