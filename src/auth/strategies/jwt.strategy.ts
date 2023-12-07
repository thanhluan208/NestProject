import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CommonServices } from 'src/services/common.service';

export interface IUserJwt {
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: CommonServices) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<any> {
    let user: any;
    // const accessToken = req.headers['authorization'].replace('Bearer ', '');

    // if (accessToken !== user?.lastAccessToken) {
    //   throw new HttpException('Invalid Access Token', HttpStatus.UNAUTHORIZED);
    // }

    // if (user.userStatus === UserStatus.BANNED) {
    //   throw new HttpException('User has been locked', HttpStatus.UNAUTHORIZED);
    // }
    console.log('1111');
    // const userExcludePassword = _excludeObject(user, ['password']);
    return true;
  }
}
