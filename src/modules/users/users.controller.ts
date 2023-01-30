import { NextFunction, Request, Response } from 'express';
import UsersService from './users.service';
import { IUpdateUser, IUser } from './interface/users.interface';
import { RequestWithUser } from '../shared/interface/routes.interface';
import buildPagination from '../shared/utils/paginationBuilder';
import { IDefaultQuery } from '../shared/interface/query.interface';
import { defaultQueryValues } from '../shared/defaults/defaults';

class UsersController {
  public usersService = new UsersService();

  public getMe = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user } = req
      const userData = {
        user_id: user.user_id,
        created_at: user.created_at,
        email: user.email,
        is_verified: user.is_verified
      }

      res.status(200).json({ success: true, data: userData, message: 'Current user' });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {

      const { limit=20, page=1 }: IDefaultQuery = req.query
      
      const data = await this.usersService.getAll(limit, Number(page-1) * 20);
      const usersCount = await this.usersService.getAllCount()
      const pagination = buildPagination(Number(usersCount[0]?.count), page, limit)

      res.status(200).json({
        success: true,
        data: {
          data,
          pagination
        }
      })
    } catch (error) {
      next(error)
    }
  }

}

export default UsersController;