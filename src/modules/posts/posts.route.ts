import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';
import validate from '../shared/middlewares/validate';
import PostsController from './posts.controller';
import { CreatePostDTO } from './dto/posts.dto';
import protect from '../shared/auth/protect';
import { DefaultQueryDTO } from '../shared/dto/query.dto';

export default class UsersRoute implements Routes {
  public path = "/posts/";
  public router = Router();
  public postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}:id`, this.postsController.getById);
    this.router.get(`${this.path}`,validate(DefaultQueryDTO,"query",true), this.postsController.getAll);
    this.router.post(`${this.path}`,protect, validate(CreatePostDTO, "body", true), this.postsController.create);
  }
}