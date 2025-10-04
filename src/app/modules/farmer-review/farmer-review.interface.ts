import { Types } from "mongoose";

export interface IReview extends Document {
  rating: number;
  comment: string;
  userId: Types.ObjectId;
  farmerId: Types.ObjectId;
  isAnonymous: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ReviewData {

  userId?: string;
  rating: number;
  comment: string;
}