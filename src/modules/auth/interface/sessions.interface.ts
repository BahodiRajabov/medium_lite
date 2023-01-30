export interface ICreateUserSession {
  user_id: string;
  refresh_token: string;
  refresh_token_expires_at: Date;
  remote_ip: string;
  device: string;
}

export interface IUserSession {
  session_id: string;
  user_id: string;
  refresh_token: string;
  refresh_token_expires_at: Date;
  logged_in_at: string;
  logged_out_at: Date;
  is_logged_out: boolean;
  remote_ip: string;
  device: string;
}







