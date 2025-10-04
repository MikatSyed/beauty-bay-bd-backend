import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import config from '../../../config'
import { ILoginResponse, IRefreshTokenResponse } from './auth.interface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.service'
import { IUser } from '../user/user.interface'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
 
    const { ...userData } = req.body
    const result = await AuthService.createUser(userData)

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User created successfully!',
      data: result,
    })
   
})

const verifyEmail: RequestHandler = catchAsync(async (req, res, next) => {
  const { token } = req.query; // Get the token from query parameters

  if (!token) {
    // If no token is provided, return a bad request response
    return next(new ApiError(httpStatus.BAD_REQUEST, "Verification token is required."));
  }

  // Call AuthService to verify the email
  await AuthService.verifyEmail(token as string);

   return res.json({ message: "Email verified successfully!" }) // Redirect the user to the login page after verification
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body
  const result = await AuthService.login(data)
  const { refreshToken, ...others } = result

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse<ILoginResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const result = await AuthService.refreshToken(refreshToken)

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  })
})

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...passwordData } = req.body;

  await AuthService.changePassword(passwordData, id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully !',
  });
});
const forgotPassword: RequestHandler = catchAsync(async (req, res) => {
  
  const { email } = req.body;


  const message = await AuthService.forgotPassword(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message:message
  });
});

const resetPassword: RequestHandler = catchAsync(async (req, res) => {
  
  const { token, newPassword } = req.body;

  const message = await AuthService.resetPassword(token, newPassword );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message:message
  });
});

export const AuthController = {
  createUser,
  verifyEmail,
  login,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
}