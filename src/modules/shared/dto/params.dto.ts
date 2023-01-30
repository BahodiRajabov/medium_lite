import { IsDefined, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IId } from "../interface/params.interface";

export class ValidateUuidDTO implements IId {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsUUID("4")
    id: string
}