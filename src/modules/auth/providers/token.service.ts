import { server } from '../../../config/conf';
import { decode, sign } from 'jsonwebtoken';

export default class TokenService {

  getAccessToken(payload: any) {

    return this.getExpiresOn(
      sign({ ...payload, token_type: "access" }, server.accessToken.secret, {
        expiresIn: server.accessToken.expiresIn
      }),
    );
  }

  getRefreshToken(payload: any) {

    return this.getExpiresOn(
      sign({ ...payload, token_type: "refresh" }, server.refreshToken.secret, {
        expiresIn: server.refreshToken.expiresIn
      }),
    );
  }

  private getExpiresOn(token: string) {

    const decoded: any = decode(token);
    
    const expiresAt = new Date(decoded.exp * 1000);

    return { token, expiresAt };
  }
}
