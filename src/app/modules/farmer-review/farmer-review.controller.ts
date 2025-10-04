import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RequestHandler } from 'express';
import { FarmerReviewService } from './farmer-review.service';


const postFarmerReview: RequestHandler = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  const result = await FarmerReviewService.postFarmerReview(req.body,userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review post successfully',
    data: result,
  });
});


const getReviewByFarmerId: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FarmerReviewService.getReviewByFarmerId(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Farmer Review retrived successfully',
    data: result,
  });
});


const deleteFarmerReviewFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FarmerReviewService.deleteFarmerReviewFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const FarmerReviewController = {
  postFarmerReview,
  getReviewByFarmerId,
  deleteFarmerReviewFromDB,
};
