import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateOtp } from '../interface/otps.interface';

export default class OtpDAO {
  
  async create({ code, user_id  }: ICreateOtp) {
    return getFirst(
      await KnexService('otp_logs')
        .insert({
          code,
          user_id,
        })
        .returning('*'),
    );
  }

  async getLastOtp(userId: string) {
    return getFirst(
      await KnexService('otp_logs')
        .where({ user_id: userId, is_active: true }),
    );
  }

  deactivateOtpById(id: string) {
    return KnexService('otp_logs')
      .update({ is_active: false })
      .where('otp_id', id)
      .returning('*');
  }
}
