import { Schema, model } from 'mongoose';
import { IReview } from './farmer-review.interface';

const reviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    farmerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const FarmerReview = model<IReview>('FarmerReview', reviewSchema);
