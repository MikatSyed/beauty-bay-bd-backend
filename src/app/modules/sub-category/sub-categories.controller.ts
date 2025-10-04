
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

import {  RequestHandler } from 'express'
import pick from '../../../shared/pick'
import {  cropsFilterableFields, queryFields } from '../../../constants/pagination'
import { ISubCategory } from './sub-categories.interface'
import { CategoryService } from './sub-categories.service'

const createCategory: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const { ...data } = req.body

    const result = await CategoryService.createCategory(data)

    sendResponse<ISubCategory>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

// const getAllCrops = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, cropsFilterableFields)
//   const queryOptions = pick(req.query, queryFields)

//   const result = await CategoryService.getAllCrops(filters, queryOptions)

//   sendResponse<ICategory[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Crops retrieved successfully!',
//     meta: result?.meta,
//     data: result?.data,
//   })
// })
// const getAllCropsForFarmer = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, cropsFilterableFields)
//   const queryOptions = pick(req.query, queryFields)
//   const userId = req?.user?.userId;

//   const result = await CategoryService.getAllCropsForFarmer(filters, queryOptions,userId)

//   sendResponse<ICategory[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Crops retrieved successfully!',
//     meta: result?.meta,
//     data: result?.data,
//   })
// })

// const getSingleCrops = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id

//   const result = await CategoryService.getSingleCrops(id)

//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Crop retrieved successfully!',
//     data: result,
//   })
// })

// const updateCrops = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id
//   const updatedData = req.body

//   const result = await CategoryService.updateCrops(id, updatedData)

//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Crop updated successfully!',
//     data: result,
//   })
// })

// const deleteCrops = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id

//   const result = await CategoryService.deleteCrops(id)

//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Crop deleted successfully!',
//     data: result,
//   })
// })

export const CategoryController = {
  createCategory,
//   getAllCrops,
//   getAllCropsForFarmer,
//   getSingleCrops,
//   updateCrops,
//   deleteCrops,
}
