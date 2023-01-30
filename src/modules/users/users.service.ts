import UsersDAO from './dao/users.dao';
import { ICreateUser, IUpdateUser } from './interface/users.interface';

export default class {
  private usersDao = new UsersDAO();

  create({ first_name, last_name, email, password }: ICreateUser) {

    return this.usersDao.create({
      first_name,
      last_name,
      email,
      password,
    });
  }

  getAllCount() {
    return this.usersDao.getAllCount();
  }

  getAll(limit:number, offset:number) {
    return this.usersDao.getAll(limit, offset);
  }

  getByEmail(email: string) {
    return this.usersDao.getByEmail(email);
  }
  getVerifiedByEmail(email: string) {
    return this.usersDao.getVerifiedByEmail(email);
  }

  getUnverifiedByEmail(email: string) {
    return this.usersDao.getUnverifiedByEmail(email);
  }
  getById(id: string) {
    return this.usersDao.getById(id);
  }
  verify(id: string) {
    return this.usersDao.verify(id);
  }
}