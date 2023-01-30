export interface ICreateOtp {
  code: number;
  user_id: string;
}

export interface IConfirmOtp {
  code: number;
  email: string;
}

export interface IOtp {
  otp_id: string;
  user_id: string;
  code: string;
  created_at: Date;
  expires_at: Date;
  is_active: string;
}

export interface IOtpWithUser {
  otp_id: string;
  user_id: string;
  created_at: Date;
  is_active: string;
  user: { is_verified: boolean };
}