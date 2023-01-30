import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';
import validate from '../shared/middlewares/validate';
import UsersController from './users.controller';
import { UpdateUserDTO } from './dto/users.dto';
import protect from '../shared/auth/protect';
import { DefaultQueryDTO } from '../shared/dto/query.dto';

export default class UsersRoute implements Routes {
  public path = '/users/';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}me`,protect, this.usersController.getMe);
    this.router.get(`${this.path}`,protect, validate(DefaultQueryDTO,"query",true), this.usersController.getAll);
  }
}