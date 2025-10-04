import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../../../config'
import { Model } from 'mongoose'
import { IUser } from './user.interface'

export interface UserModel extends Model<IUser> {
  isVerifiedUserExist(userId: any): unknown
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password' | 'role' | '_id' | 'isVerified' | 'isApproved'> | null>
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String,enum: ['admin', 'customer'],required: true,default: 'customer'},
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    image:{type:[String],default:[]},
    phone: String,
    address: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,

    isVerified: { type: Boolean, default: false },

    verificationToken: { type: String, default: null }, 
    verificationTokenExpire: { type: Date, default: null }, 

    // Password reset fields
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },


  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password // Remove password from the response
        return ret
      },
    },
  }
)

// Hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next()
})

// Check if user exists
UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'email' | 'password' | 'role' | '_id' | 'isVerified' | 'isApproved'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1, role: 1, isVerified: 1, isApproved: 1 })
}

UserSchema.statics.isVerifiedUserExist = async function (
  id: string
): Promise<Pick<IUser, 'password' | 'role' | 'email' | '_id'> | null> {
  return await User.findOne(
    { _id: id },
    { password: 1, role: 1, email: 1 }
  )
}

// Compare passwords
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

export const User = model<IUser, UserModel>('User', UserSchema)
