import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { CategoryController } from './categories.controller'
import { CategoryValidation } from './categories.validation'


/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidation.createCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory
)


router.get(
  '/',
  CategoryController.getAllCategories
)

// router.get(
//   '/farmer-crops',
//   auth( ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.ADMIN),
//   CropsController.getAllCropsForFarmer
// )

// router.post(
//   '/',
//   validateRequest(CropsValidation.createCropsZodSchema),
//   auth(ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
//   CropsController.createCrops
// )
// router.patch(
//   '/:id',
//   validateRequest(CropsValidation.updateCropsZodSchema),
//   auth( ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
//   CropsController.updateCrops
// )
// router.get(
//   '/',
//   // auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
//   CropsController.getAllCrops
// )
// router.get(
//   '/farmer-crops',
//   // auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
//   CropsController.getAllCropsForFarmer
// )
// router.get(
//   '/:id',
//   // auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
//   CropsController.getSingleCrops
// )
// router.delete('/:id', auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS), CropsController.deleteCrops)

export const CategoryRoutes = router;