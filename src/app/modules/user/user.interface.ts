import { Model, Types } from 'mongoose'

export interface IUser {
  _id: Types.ObjectId
  email: string
  password: string
  role: 'admin' | 'customer'
  fname: string
  lname: string
  phone: string
  image?: string[]
  address?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string

  verificationToken?: string | null;
  verificationTokenExpire?: Date

  resetPasswordToken?: string
  resetPasswordExpire?: Date

  isVerified: boolean
  isApproved: boolean
  createdAt?: any
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'email' | 'password' | 'role' | '_id'> | null>

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>

  isVerifiedUserExist(
    userId: string
  ): Promise<Pick<IUser, '_id' | 'role'> | null>
} & Model<IUser>
