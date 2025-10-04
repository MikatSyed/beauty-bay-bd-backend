import express from "express";
import { TrackingController } from "./tracking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { TrackingValidation } from "./tracking.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();


// Get tracking records by logistic ID (or could be current logged-in user)
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.ADMIN),
  TrackingController.getTrackingByOrderId
);


export const TrackingRoutes = router;
