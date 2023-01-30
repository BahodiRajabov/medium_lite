import { isEmpty, isUndefined } from "lodash";
import ErrorResponse from "../shared/utils/errorResponse";

import {
  generateRandomDigit,
  getCurrentDate,
  getDateByValue,
  getExpireDate,
} from "../shared/utils/utils";
import { compareHash, generateHash } from "../shared/utils/bcrypt";

import { IUser } from "../users/interface/users.interface";

import UsersService from "../users/users.service";

import OtpsDAO from "./dao/otps.dao";
import SessionsDAO from "./dao/sessions.dao";

import { ISignin, ISignup, ITokenPayload } from "./interface/auth.interface";
import sendEmail from "../shared/utils/sendEmail";
import { IConfirmOtp, IOtp, IOtpWithUser } from "./interface/otps.interface";
import TokenService from "./providers/token.service";
import { IUserSession } from "./interface/sessions.interface";

export default class AuthService {
  private OtpDigitsCount = 4;

  private usersService = new UsersService();

  private otpsDao = new OtpsDAO();
  private sessionsDao = new SessionsDAO();

  private jwtService = new TokenService()

  async signup({ email, first_name, last_name, password }: ISignup) {
    let user: IUser

    const verifiedUser = await this.usersService.getVerifiedByEmail(email);
  
    if (verifiedUser) {
      throw new ErrorResponse(400, "This email already exists");
    }

    const unverifiedUser = await this.usersService.getUnverifiedByEmail(email);

    if (unverifiedUser) {
      user = unverifiedUser

    } else {
      const generatedHash = await generateHash(password);
      user = await this.usersService.create({
        email,
        first_name,
        last_name,
        password: generatedHash,
      });

    }

    const sentOtp = await this.sendOtp(user);

    return { otp: sentOtp, otpEmail: email };
  }

  async sendOtp({ user_id, email }: IUser): Promise<IOtpWithUser> {
    const user = await this.usersService.getByEmail(email)
    const lastOtp = await this.otpsDao.getLastOtp(user.user_id);

    if (lastOtp) {
      await this.otpsDao.deactivateOtpById(lastOtp.otp_id)
    }

    const otp = await this.otpsDao.create({
      code: Number(generateRandomDigit(this.OtpDigitsCount)),
      user_id,
    });

    const data = {
      created_at: otp.created_at,
      is_active: otp.is_active,
      otp_id: otp.otp_id,
      email: otp.email,
      user_id: otp.user_id,
      user: {
        is_verified: user.is_verified
      }
    }

    let messageBody = `Verification code: ${otp.code}`;

    await sendEmail(email, "verification", messageBody);

    return data;
  }

  async resendOtp(email: string) {

    const user = await this.usersService.getByEmail(email)

    if (!user) {
      throw new ErrorResponse(400, 'Invalid user email');
    }

    const otp = await this.otpsDao.getLastOtp(user.user_id);

    if (!otp || !(getCurrentDate() >= getExpireDate(otp.created_at))) {
      throw new ErrorResponse(400, 'Cannot send, last one is avtive now')
    }

    await this.otpsDao.deactivateOtpById(otp.otp_id)

    const sentOtp = await this.sendOtp(user)

    return { ...sentOtp, email }
  }

  async confirm({ code, email }: IConfirmOtp, ip: string, device: string) {
    const user: IUser = await this.usersService.getByEmail(email);

    if (isEmpty(user)) {
      throw new ErrorResponse(400, "Email or code is invalid");
    }

    const lastOtp = await this.otpsDao.getLastOtp(user.user_id);

    if (isUndefined(lastOtp) || Number(lastOtp.code) !== code) {
      throw new ErrorResponse(400, "Code isn't valid");
    }

    await this.otpsDao.deactivateOtpById(lastOtp.otp_id);

    await this.usersService.verify(user.user_id)

    const accessTokenPayload: ITokenPayload = { user_id: user.user_id }

    const accessToken = this.jwtService.getAccessToken(accessTokenPayload)
    const refreshToken = this.jwtService.getRefreshToken(accessTokenPayload)

    await this.sessionsDao.create({
      device,
      refresh_token: refreshToken.token,
      refresh_token_expires_at: refreshToken.expiresAt,
      remote_ip: ip,
      user_id: user.user_id
    });

    return {
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken
      }, user: {
        created_at: user.created_at,
        userId: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        user_id: user.user_id,
        email: user.email,
        is_verified: user.is_verified,
      }
    }

  }

  async signIn({ password, email }: ISignin, device: string, ip: string) {
    const user = await this.usersService.getVerifiedByEmail(email)

    if (!user) {
      throw new ErrorResponse(400, "User doesn't exist")
    }

    const isValid = await compareHash(password, user.password)

    if (!isValid) {
      throw new ErrorResponse(400, "Password or email is wrong")
    }

    const accessTokenPayload: ITokenPayload = { user_id: user.user_id }

    const accessToken = this.jwtService.getAccessToken(accessTokenPayload)
    const refreshToken = this.jwtService.getRefreshToken(accessTokenPayload)

    await this.sessionsDao.create({
      device,
      refresh_token: refreshToken.token,
      refresh_token_expires_at: refreshToken.expiresAt,
      remote_ip: ip,
      user_id: user.user_id
    });

    return {
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken
      }, user: {
        created_at: user.created_at,
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_verified: user.is_verified,
      }
    }
  }

  async refreshToken(refreshToken: string) {
    const tokenInfo: IUserSession = await this.sessionsDao.getByRefreshToken(refreshToken)

    if (isUndefined(tokenInfo) || getCurrentDate() > getDateByValue(tokenInfo.refresh_token_expires_at).getTime()) {
      throw new ErrorResponse(400, "Refresh token is not valid")
    }

    const accessTokenPayload: ITokenPayload = { user_id: tokenInfo.user_id }

    const accessToken = this.jwtService.getAccessToken(accessTokenPayload)

    return accessToken

  }


}