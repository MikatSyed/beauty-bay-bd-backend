import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import {
  ChangePasswordPayload,
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from '../auth/auth.interface'
import { User } from '../user/user.model'
import { IUser } from '../user/user.interface'
import bcrypt from 'bcryptjs'
import { generateResetToken, generateVerificationToken } from '../../../helpers/generateResetToken'
import { passwordResetEmailTemplate } from '../../../utils/emails/passwordResetEmailTemplate'
import { sendEMail } from '../../../utils/sendMail'
import { registrationConfirmationEmailTemplate } from '../../../utils/emails/registrationConfirmationEmailTemplate'
/* @typescript-eslint/no-explicit-any */

 const createUser = async (user: IUser): Promise<IUser | null> => {

  const existingUser = await User.findOne({ email: user.email })

  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, "User already exists with this email")
  }

    // Create the user in the database
    const createdUser = await User.create(user);
    
    // Generate registration date in a readable format
    const registrationDate = createdUser.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

      const smtpMail = process.env.SMTP_MAIL
  if (!smtpMail) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "SMTP_MAIL is not defined in the configuration.")
  }

    const { hashedToken, expires } = await generateVerificationToken()

  // Update the document's reset fields
  createdUser.verificationToken = hashedToken
  createdUser.verificationTokenExpire = expires
  await createdUser.save()

    // Get environment variables for email
    const helpCenterUrl = "http://localhost:3000";
    const frontendUrl = process.env.FRONTEND_URL!
    const verificationUrl= `${frontendUrl}/verify-email?token=${hashedToken}`;
    const companyAddress = "123 Farm Lane, Greenville, CA 90001, USA";
    const phoneNumber = "+0170000000";
    const supportEmail = process.env.SMTP_MAIL!;
    const from = smtpMail

    // Set email subject
    const subject = "Welcome to Beauty Bay BD - Please Verify Your Email";
    
    // Generate email content with the user's role
    const htmlContent = registrationConfirmationEmailTemplate({
      username: `${createdUser.fname} ${createdUser.lname}`,
      toEmail: createdUser.email,
      registrationDate,
      verificationUrl,
      supportEmail,
      helpCenterUrl,
      companyAddress,
      phoneNumber,

    });

    // Send the email
    await sendEMail(from, createdUser.email, subject, htmlContent);
    
    return createdUser;
  
};

const verifyEmail = async (token: string) => {
 
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
   
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid verification token.");
  }

  // Mark the user as verified and clear the token
  user.isVerified = true;
  user.verificationToken = null; // Clear the token after successful verification
  await user.save(); // Save the updated user data

  return user;
};


const login = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { email, password } = payload

  // Check if the user exists
  const isUserExist = await User.isUserExist(email)
  console.log(isUserExist)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist")
  }

  // Check if the user's email is verified
  if (!isUserExist.isVerified) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Your account is not verified yet. Please verify your email first."
    )
  }

  // Check password for all users
  if (isUserExist.password && !(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password. Please try again")
  }

  // Create access token & refresh token
  const { _id: userId, role } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as any
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as any
  )

  return {
    accessToken,
    refreshToken
  }
}



const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token

  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = verifiedToken

  // checking deleted user's refresh token

  const isUserExist = await User.isVerifiedUserExist(userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token
  const { _id: id, role }:any = isUserExist
  const newAccessToken = jwtHelpers.createToken(
    {
      id: id,
      role: role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as any
  )

  return {
    accessToken: newAccessToken,
  }
}

export const changePassword = async (payload: ChangePasswordPayload, id: string): Promise<void> => {
  const { oldPassword, newPassword } = payload

  // Find user by ID
  const userDoc = await User.findById(id).exec()
  if (!userDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found")
  }

  // Check if password exists
  if (!userDoc.password) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "No password set for this account")
  }

  // Compare the provided old password with the stored hash
  const isMatch = await User.isPasswordMatched(oldPassword, userDoc.password)
  if (!isMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Old Password is incorrect")
  }


  // Update and save the document
  userDoc.password = newPassword
  await userDoc.save()
}

export const forgotPassword = async (email: string): Promise<string> => {

  // Find user by email
  const accountDoc = await User.findOne({ email }).exec()
  console.log(accountDoc,'215');

  if (!accountDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist")
  }

  const smtpMail = process.env.SMTP_MAIL
  if (!smtpMail) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "SMTP_MAIL is not defined in the configuration.")
  }

  // Generate a reset token (hashed) and its expiration timestamp
  const { hashedToken, expires } = await generateResetToken()

  // Update the document's reset fields
  accountDoc.resetPasswordToken = hashedToken
  accountDoc.resetPasswordExpire = expires
  await accountDoc.save()
  console.log(accountDoc,'232')
  // Prepare email data
  const {fname,lname } = accountDoc
  const username = `${fname} ${lname}` 
  const frontendUrl = process.env.FRONTEND_URL!
  const resetUrl = `${frontendUrl}/auth/reset-password?token=${hashedToken}`
  const helpCenterUrl = "http://localhost:3000"
  const companyAddress = "123 Farm Lane, Greenville, CA 90001, USA"
  const phoneNumber = "+0170000000"
  const supportEmail = process.env.SMTP_MAIL!

  const subject = "Beauty Bay BD - Password Recovery"
  const from = smtpMail
  const htmlContent = passwordResetEmailTemplate({
    username,
    email,
    resetUrl,
    supportEmail,
    helpCenterUrl,
    companyAddress,
    phoneNumber,
  })

  // Send the email
  await sendEMail(from, email, subject, htmlContent)

  return "Password reset email has been sent successfully!"
}
export const resetPassword = async (token: string, newPassword: string): Promise<string> => {
  console.log(token,'185')
  // Find user with matching reset token that hasn't expired
  const accountDoc = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gte: new Date() },
  }).exec()
  console.log(accountDoc,'197')

  if (!accountDoc) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid or expired reset token")
  }

  // Hash the new password

  // Update the password and clear reset fields
  accountDoc.password = newPassword
  accountDoc.resetPasswordToken = undefined
  accountDoc.resetPasswordExpire = undefined
  await accountDoc.save()

  return "Password reset successful. You can now log in with your new password."
}

export const AuthService = {
  createUser,
  verifyEmail,
  login,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
}
