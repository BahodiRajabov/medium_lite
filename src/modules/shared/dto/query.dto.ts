import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { IDefaultQuery } from "../interface/query.interface";

export class DefaultQueryDTO implements IDefaultQuery{
    @IsString()
    limit: number;

    @IsString()
    page: number;

}