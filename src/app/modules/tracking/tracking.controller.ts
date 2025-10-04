import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ITracking } from "./tracking.interface"
import { Request, RequestHandler, Response } from "express"
import { TrackingService } from "./tracking.service"

const getTrackingByOrderId = catchAsync(async (req: Request, res: Response) => {
  const orderId = req?.params?.id;
  const result = await TrackingService.getTrackingByOrderId(orderId);

  sendResponse<ITracking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tracking records retrieved successfully!",
    data: result,
  })
})


export const TrackingController = {
 
  getTrackingByOrderId,

}
