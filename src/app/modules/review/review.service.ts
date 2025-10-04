import { Review } from './review.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ReviewData } from './review.interface';



const postReview = async (data: ReviewData, userId: string) => {
  const reviewData = {
    ...data,
    userId,
  };

  const review = new Review(reviewData);
  const result = await review.save();
  return await result;
};

const postProviderReview = async (data: ReviewData, userId: string) => {
  const reviewData = {
    ...data,
    userId,
  };

  const review = new Review(reviewData);
  const result = await review.save();
  return await result.populate(['userId', 'providerId']);
};

const getAllReview = async () => {
   const reviews =  await Review.find()
    .populate('userId')
    .sort({ createdAt: -1 });
    // Total number of reviews
  const totalReviews = reviews.length;

  // Calculate average rating
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  // Calculate rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, percentage, count };
  });

  return {
    reviews,
    averageRating,
    totalReviews,
    ratingDistribution,
  };
};

const getReviewByCropId = async (cropId: string) => {
  const reviews =  await Review.find({ cropId })
    .populate('userId')
    .sort({ createdAt: -1 });
    const totalReviews = reviews.length;

  // Calculate average rating
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  // Calculate rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, percentage, count };
  });

  return {
    reviews,
    averageRating,
    totalReviews,
    ratingDistribution,
  };
};

const getReviewByProviderId = async (providerId: string) => {
  return await Review.find({ providerId })
    .populate('userId')
    .sort({ createdAt: -1 });
};

const deleteReviewFromDB = async (id: string) => {
  const review = await Review.findById(id).populate('userId');

  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  return await Review.findByIdAndDelete(id);
};

export const ReviewCrops = {
  postReview,
  postProviderReview,
  getAllReview,
  getReviewByCropId,
  getReviewByProviderId,
  deleteReviewFromDB,
};
