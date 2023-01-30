import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import {
  IResendOtp,
  ISignin,
  ISignup,
} from '../interface/auth.interface';
import { IConfirmOtp } from '../interface/otps.interface';

export class SignupDTO implements ISignup {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  first_name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  last_name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

}

export class SigninDTO implements ISignin {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class ConfirmOtpDTO implements IConfirmOtp {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  code: number;

}

export class ResendOtpDTO implements IResendOtp {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

}