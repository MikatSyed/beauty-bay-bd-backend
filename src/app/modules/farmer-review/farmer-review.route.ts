import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FarmerReviewController } from './farmer-review.controller';
import { FarmerReviewValidation } from './farmer-review.validation';

const router = express.Router();

router.post(
  '/',
  // validateRequest(FarmerReviewValidation.FarmerReviewValidation),
  auth(ENUM_USER_ROLE.BUYER),
  FarmerReviewController.postFarmerReview
);
router.get(
  '/:id',
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.BUYER),
  FarmerReviewController.getReviewByFarmerId
);


router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), FarmerReviewController.deleteFarmerReviewFromDB);

export const FarmerReviewRoutes = router;
