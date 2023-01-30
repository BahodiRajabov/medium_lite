export interface ICreatePost {
  title: string;
  content: string;
  author_id?:string;
}

export interface IPost {
  post_id: string;
  author_id: string;
  created_at: Date;
  title: string;
  content: string;
}
