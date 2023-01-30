import { NextFunction, Request, Response } from 'express';
import PostsService from './posts.service';
import { ICreatePost, IPost } from './interface/posts.interface';
import { RequestWithUser } from 'modules/shared/interface/routes.interface';
import { IDefaultQuery } from '../shared/interface/query.interface';
import buildPagination from '../shared/utils/paginationBuilder';

class PostsController {
  public postsService = new PostsService();

  public getById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {

      const { id } = req.params

      const post = await this.postsService.getById(id)

      res.status(200).json({ success: true, data: post});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {

      const { title, content } = req.body
      const { user_id } = req.user

      const post = await this.postsService.create({content,title, user_id})

      res.status(200).json({ success: true, data: post});
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {

      const { limit=20, page=1 }: IDefaultQuery = req.query
      
      const data = await this.postsService.getAll(limit, Number(page-1) * 20);
      const usersCount = await this.postsService.getAllCount()
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

export default PostsController;