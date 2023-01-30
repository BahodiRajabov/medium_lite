import { Request } from "express";

export interface ICreateUser {
  full_name: string;
  email: string;
  password: string;
  language_id: number;
}

export interface ISignin {
  email: string;
  password: string;
}

export interface ISignup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ITokenPayload {
  user_id: string;
}

export interface IDecodedToken {
  user_id: string;
  token_type: string;
}

export interface IResendOtp {
  email: string;
}

export interface IRefreshToken {
  token: string;
}