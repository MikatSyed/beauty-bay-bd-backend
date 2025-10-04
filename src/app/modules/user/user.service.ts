import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from './user.model'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Review } from '../review/review.model'
import  Crop  from '../crops/crops.model'
import { IUser } from './user.interface'



const getAllUsers = async (): Promise<IUser[]> => {
  // find all users whose role is _not_ 'admin'
  return await User.find({ role: { $ne: 'admin' } })
}








interface IUserWithRelations extends IUser {
  reviews: any[]
  crops: any[]
}

const getSingleUser = async (id: string): Promise<IUserWithRelations> => {
  const user = await User.findById(id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // Find all reviews by this user
  const reviews = await Review.find({ user_id: id })

  // Find all crops where this user is the farmer
  const crops = await Crop.find({ farmer_id: id })

  return {
    ...user.toObject(),
    reviews,
    crops,
  }
}


const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const existingUser = await User.findById(id)

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const updatedUserData: Partial<IUser> = { ...payload }

  if (payload.password) {
    const salt = await bcrypt.genSalt(10)
    updatedUserData.password = await bcrypt.hash(payload.password, salt)
  }

  const result = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  })

  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}



const getLoggedUser = async (id: JwtPayload): Promise<IUser | null> => {
  const userId = id;

  if (!userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid token payload: missing user ID"
    );
  }

  const user = await User.findById(userId).select(
    "-password -resetPasswordToken -resetPasswordExpire -verificationToken -verificationTokenExpire"
  );

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  return user;
};

export default getLoggedUser;

const updateLoggedUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<Partial<IUser> | null> => {
  const existingUser = await User.findById(id)

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const updatedUserData: Partial<IUser> = { ...payload }

  if (payload.password) {
    const salt = await bcrypt.genSalt(10)
    updatedUserData.password = await bcrypt.hash(payload.password, salt)
  }

  const result = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
    fields: {
      username: 1,
      phone: 1,
      address: 1,
      city: 1,
      state: 1,
      zip_code: 1,
      country: 1,
      _id: 1,
    },
  })

  return result
}








export const userService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getLoggedUser,
  updateLoggedUser
}
