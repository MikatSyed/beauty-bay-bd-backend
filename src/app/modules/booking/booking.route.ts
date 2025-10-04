import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';

const router = express.Router();


router.patch(
  '/:id',
  auth( ENUM_USER_ROLE.FARMER),
  BookingController.updateBookingStatusByFarmer
);


router.get(
  '/farmer-order',
  auth( ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.ADMIN),
  BookingController.getBookingsByFarmerId
);


router.post(
  '/',
  validateRequest(BookingValidation.bookingZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  BookingController.postBooking
);

router.get(
  '/',
  BookingController.getAllBooking
);
router.get(
  '/',
  BookingController.getAllBooking
);

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.BUYER),
  BookingController.getBookingsById
);

router.get(
  '/buyer/booking',
  auth(ENUM_USER_ROLE.BUYER),
  BookingController.getBookingsByBuyerId
);

router.get('/', BookingController.getAllBooking);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), BookingController.deleteBookingFromDB);

export const BookingRoutes = router;
