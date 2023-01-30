import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreatePost, IPost } from '../interface/posts.interface';

export default class PostsDAO {
  async create({
    title,
    content,
    author_id
  }: ICreatePost): Promise<IPost> {
    return getFirst(
      await KnexService('posts')
        .insert({
          title,
          content,
          author_id
        })
        .returning('*'),
    );
  }

  async getById(id: string) {
    return getFirst(
      await KnexService('posts')
        .select([
          "title",
          "content",
          "author_id",
        ])
        .where({ post_id: id })
        .first()
    )
  }

  async getAll(limit:number, offset:number) {
    return await KnexService('posts')
    .select([
        'posts.title', 
        'posts.content',   
        'posts.author_id',  
        'users.first_name',  
    ]) 
    .innerJoin('users', 'users.user_id', 'posts.author_id')
    .limit(limit)
    .offset(offset)
  }

  async getAllCount() { 
    return await KnexService('posts')
    .count('posts.post_id')
} 

}
