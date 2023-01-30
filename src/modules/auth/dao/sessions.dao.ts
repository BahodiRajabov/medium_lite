import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateUserSession } from '../interface/sessions.interface';

export default class UserTokensDAO {
  async create({
    device,
    remote_ip,
    refresh_token,
    refresh_token_expires_at,
    user_id,
  }: ICreateUserSession) {
    return getFirst(
      await KnexService('user_sessions')
      .insert({
        user_id,
        refresh_token,
        refresh_token_expires_at,
        remote_ip,
        device
      }),
    );
  }

  async getByRefreshToken(refreshToken: string) {
    
    return await KnexService('user_sessions')
      .select('*')
      .where({
        is_logged_out: false,
        refresh_token: refreshToken,
      })
      .first();
  }
}
