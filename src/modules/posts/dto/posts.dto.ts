import { IsDefined, IsString, MinLength } from "class-validator";
import { ICreatePost } from "../interface/posts.interface";

export class CreatePostDTO implements ICreatePost {
  @IsDefined()
  @IsString({ message: "Full name must be string" })
  @MinLength(5, { message: "Full name length must be at least 5" })
  title: string;
  
  @IsDefined()
  @IsString({ message: "Full name must be string" })
  @MinLength(5, { message: "Full name length must be at least 5" })
  content: string;

}