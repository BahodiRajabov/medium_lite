export interface ICreateUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  first_name?: string;
  last_name?: string;
}

export interface IUser {
  user_id: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_active: boolean;
  is_verified: boolean;
}
