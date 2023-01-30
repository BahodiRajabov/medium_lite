import { Router } from 'express';
import AuthRoute from './modules/auth/auth.route';
import UsersRoute from './modules/users/users.route';
import PostsRoute from './modules/posts/posts.route';


const router = Router()

const authRoute = new AuthRoute()
const usersRoute = new UsersRoute()
const postsRoute = new PostsRoute()

router.use("/", authRoute.router)
router.use("/", usersRoute.router)
router.use("/", postsRoute.router)

export default router