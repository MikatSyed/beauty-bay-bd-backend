import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import Tracking from "./tracking.model"
import mongoose from "mongoose"


const getTrackingByOrderId = async (orderId: string) => {
  console.log(orderId, '🛤️')
  return await Tracking.find({ orderId })
    .populate(['orderId', 'deliveryId', 'logisticId'])
    
}




export const TrackingService = {

  getTrackingByOrderId,
  
}
