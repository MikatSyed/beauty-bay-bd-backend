import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { IDelivery } from "./delivery.interface"
import { Request, RequestHandler, Response } from "express"
import { DeliveryService } from "./delivery.service"


const createDelivery: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const assignedBy = req?.user?.userId;
    const { orderId,...deliveryData } = req.body
    console.log(assignedBy,deliveryData,orderId,'😀😀')

    const result = await DeliveryService.createDelivery(assignedBy,deliveryData,orderId)

    sendResponse<IDelivery>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Delivery created successfully!",
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

const getDeliveryByLogisticId = catchAsync(async (req: Request, res: Response) => {
  const logisticId = req?.user?.userId;
  const result = await DeliveryService.getDeliveryByLogisticId(logisticId)

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delivery retrieved successfully!",
    data: result,
  })
})

const updateDeliveryStatusByLogistic: RequestHandler = catchAsync(async (req, res) => {
  const deliveryId = req.params.id
  const logisticId = req?.user?.userId 

  const updates = req.body; 
  console.log(updates,'😏')

  const result = await DeliveryService.updateDeliveryStatusByLogistic(deliveryId, logisticId, updates)

  sendResponse<IDelivery>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Delivery status updated successfully",
    data: result,
  })
})

// const getAllDeliveries = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, deliveryFilterableFields)
//   const queryOptions = pick(req.query, queryFields)

//   const result = await DeliveryService.getAllDeliveries(filters, queryOptions)

//   sendResponse<IDelivery[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Deliveries retrieved successfully!",
//     meta: result?.meta,
//     data: result?.data,
//   })
// })

// const getSingleDelivery = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id

//   const result = await DeliveryService.getSingleDelivery(id)

//   sendResponse<IDelivery>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Delivery retrieved successfully!",
//     data: result,
//   })
// })

// const updateDelivery = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id
//   const updatedData = req.body

//   const result = await DeliveryService.updateDelivery(id, updatedData)

//   sendResponse<IDelivery>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Delivery updated successfully!",
//     data: result,
//   })
// })

// const deleteDelivery = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id

//   const result = await DeliveryService.deleteDelivery(id)

//   sendResponse<IDelivery>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Delivery deleted successfully!",
//     data: result,
//   })
// })

export const DeliveryController = {
  createDelivery,
  getDeliveryByLogisticId,
  updateDeliveryStatusByLogistic
//   getAllDeliveries,
//   getSingleDelivery,
//   updateDelivery,
//   deleteDelivery,
}