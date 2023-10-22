import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { USER, USER_PASSWORD } from 'src/constants';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, password: string) {
    console.log({ email, password });
    if (email !== USER || password !== USER_PASSWORD) {
      throw new UnauthorizedException();
    }

    const payload = { sub: USER };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRE_TIME'),
      }),
    };
  }
}
