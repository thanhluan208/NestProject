import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { CommonServices } from 'src/services/common.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: CommonServices) {
    super({
      clientID: configService.getEnv('FACEBOOK_ID'),
      clientSecret: configService.getEnv('FACEBOOK_SECRET'),
      callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
      scope: [
        'email',
        // 'pages_manage_engagement',
        // 'pages_manage_posts',
        // 'pages_read_engagement',
        // 'pages_read_user_engagement',
      ],
      profileFields: ['id', 'name', 'emails', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void | Promise<any> | any,
  ): Promise<any> {
    const { name, emails } = profile;
    console.log('profile', profile);

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
