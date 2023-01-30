import PostsDAO from './dao/posts.dao';
import { ICreatePost, IPost } from './interface/posts.interface';

export default class {
  private postsDao = new PostsDAO();

  create({ title, content, user_id }) {

    return this.postsDao.create({
      title,
      content,
      author_id: user_id
    });
  }

  getById(id: string) {
    return this.postsDao.getById(id);
  }

  getAllCount() {
    return this.postsDao.getAllCount();
  }

  getAll(limit:number, offset:number) {
    return this.postsDao.getAll(limit, offset);
  }

}