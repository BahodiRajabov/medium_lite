import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { IUser } from '../users/interface/users.interface';
import { ConfirmOtpDTO, ResendOtpDTO, SigninDTO, SignupDTO } from './dto/auth.dto';
import requestIp from 'request-ip';
import { IRefreshToken, ISignin } from './interface/auth.interface';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SignupDTO = req.body;

      const data = await this.authService.signup(userData);

      res.status(201).json({ success: true, data: {}, message: `Verification code sent to ${data.otpEmail}` });
    } catch (error) {
      next(error);
    }
  };
  public confirmOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const otpData: ConfirmOtpDTO = req.body;

      const remoteIp = requestIp.getClientIp(req);
      const device = req.headers['user-agent'];

      const data = await this.authService.confirm(otpData, remoteIp, device);

      res.status(201).json({ success: true, data: data, message: `Email was verified successfuly` });
    } catch (error) {
      next(error);
    }
  };
  public resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const otpData: ResendOtpDTO = req.body;

      const data = await this.authService.resendOtp(otpData.email);

      res.status(201).json({ success: true, data: {}, message: `Verification code sent to ${data.email}` });
    } catch (error) {
      next(error);
    }
  };
  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SigninDTO = req.body;

      const remoteIp = requestIp.getClientIp(req);
      const device = req.headers['user-agent'];

      const data = await this.authService
        .signIn({ email: userData.email, password: userData.password }, device, remoteIp);

      res.status(201).json({ success: true, data: data, message: 'Login success' });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: IRefreshToken = req.body;

      const accessToken = await this.authService
        .refreshToken(data.token);

      res.status(201).json({ success: true, data: { accessToken }, message: 'Access token generated' });
    } catch (error) {
      next(error);
    }
  };

}

export default AuthController;
