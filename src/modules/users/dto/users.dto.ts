import { IsEmail, IsString, MinLength } from "class-validator";
import { IUpdateUser } from "../interface/users.interface";

export class UpdateUserDTO implements IUpdateUser {
  @IsString({ message: "Full name must be string" })
  @MinLength(5, { message: "Full name length must be at least 5" })
  first_name?: string;

  @IsString({ message: "Full name must be string" })
  @MinLength(5, { message: "Full name length must be at least 5" })
  last_name?: string;
}