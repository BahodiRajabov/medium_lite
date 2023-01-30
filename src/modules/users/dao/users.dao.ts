import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateUser, IUpdateUser, IUser } from '../interface/users.interface';

export default class UsersDAO {
  async create({
    first_name,
    last_name,
    email,
    password,
  }: ICreateUser): Promise<IUser> {
    return getFirst(
      await KnexService('users')
        .insert({
          first_name,
          last_name,
          password,
          email,
        })
        .returning('*'),
    );
  }

  async getAllCount() { 
    return await KnexService('users')
    .count('users.user_id')
} 

async getAll(limit:number, offset:number) {
  return await KnexService('users')
  .select([
      'users.user_id', 
      'users.last_name',   
      'users.first_name',    
  ]) 
  .limit(limit)
  .offset(offset)
}

  getById(id: string) {
    return KnexService('users')
      .where({ user_id: id})
      .first();
  }

  getVerifiedByEmail(email: string) {
    return KnexService('users')
      .where({ email: email, is_verified: true })
      .first();
  }

  getUnverifiedByEmail(email: string) {
    return KnexService('users')
      .where({ email: email, is_verified: false })
      .first();
  }

  getByEmail(email: string) {
    return KnexService('users')
      .where({ email: email})
      .first();
  }

  verify(id: string) {
    return KnexService('users')
      .update({ is_verified: true })
      .where('user_id', id)
      .returning('*');
  }
}
