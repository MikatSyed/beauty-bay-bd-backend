import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RequestHandler } from 'express';
import { BookingService } from './boooking.service';


const postBooking: RequestHandler = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  console.log(userId,'10')
  const result = await BookingService.createBooking(req.body,userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking post successfully',
    data: result,
  });
});
// const postProviderBooking: RequestHandler = catchAsync(async (req, res) => {
//   const userId = req?.user?.userId;
 
//   const result = await BookingService.postProviderBooking(req.body,userId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Provider Booking post successfully',
//     data: result,
//   });
// });



const getAllBooking: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking post successfully',
    data: result,
  });
});

const getBookingsById: RequestHandler = catchAsync(async (req, res) => {
  const bookingId = req?.params?.id;
  const result = await BookingService.getBookingsById(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrived successfully',
    data: result,
  });
});

const getBookingsByBuyerId: RequestHandler = catchAsync(async (req, res) => {
  const buyerId = req?.user?.userId;
  const result = await BookingService.getBookingsByBuyerId(buyerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrived successfully',
    data: result,
  });
});


const updateBookingStatusByFarmer: RequestHandler = catchAsync(async (req, res) => {
  const farmerId = req?.user?.userId;
  const { id } = req.params;
  const status  = req.body;
  const result = await BookingService.updateBookingStatusByFarmer(id,farmerId,status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrived successfully',
    data: result,
  });
});


const getBookingsByFarmerId: RequestHandler = catchAsync(async (req, res) => {
   const farmerId = req?.user?.userId;
  const result = await BookingService.getBookingsByFarmerId(farmerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Farmer Order retrive successfully',
    data: result,
  });
});

const deleteBookingFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.deleteBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  postBooking,
  getAllBooking,
  getBookingsById,
  getBookingsByBuyerId,
  getBookingsByFarmerId,
  updateBookingStatusByFarmer,
  deleteBookingFromDB
};
