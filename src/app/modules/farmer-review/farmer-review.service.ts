import { FarmerReview } from './farmer-review.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ReviewData } from './farmer-review.interface';



const postFarmerReview = async (data: ReviewData, userId: string) => {
  const reviewData = {
    ...data,
    userId,
  };

  const result = await FarmerReview.create(reviewData);

  return  result;
};



const getReviewByFarmerId = async (farmerId: string) => {
  // Fetch all reviews for the given farmer and populate only the 'username' field
  const reviews = await FarmerReview.find({ farmerId })
    .populate('userId', 'username') // Populate only 'username' field
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



const deleteFarmerReviewFromDB = async (id: string) => {
  const review = await FarmerReview.findById(id).populate('userId');

  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  return await FarmerReview.findByIdAndDelete(id);
};

export const FarmerReviewService = {
  postFarmerReview,
  getReviewByFarmerId,
  deleteFarmerReviewFromDB,
};
