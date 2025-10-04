import express from "express"
import { DeliveryController } from "./delivery.controller"
import validateRequest from "../../middlewares/validateRequest"
import { DeliveryValidation } from "./delivery.validation"
import auth from "../../middlewares/auth"
import { ENUM_USER_ROLE } from "../../../enums/user"

const router = express.Router()

router.post(
  "/",
//   validateRequest(DeliveryValidation.createDeliveryZodSchema),
  auth(
    ENUM_USER_ROLE.FARMER
  ),
  DeliveryController.createDelivery
)
router.get(
  "/logistic",
//   validateRequest(DeliveryValidation.createDeliveryZodSchema),
  auth(
    ENUM_USER_ROLE.LOGISTICS,ENUM_USER_ROLE.ADMIN
  ),
  DeliveryController.getDeliveryByLogisticId
)

router.patch(
  "/status/:id",
//   validateRequest(DeliveryValidation.createDeliveryZodSchema),
  auth(
    ENUM_USER_ROLE.LOGISTICS
  ),
  DeliveryController.updateDeliveryStatusByLogistic
)

// router.patch(
//   "/:id",
//   validateRequest(DeliveryValidation.updateDeliveryZodSchema),
//   auth(
//     ENUM_USER_ROLE.BUYER,
//     ENUM_USER_ROLE.FARMER,
//     ENUM_USER_ROLE.LOGISTICS
//   ),
//   DeliveryController.updateDelivery
// )

// router.get(
//   "/",
//   // Uncomment below if you want to restrict getAll deliveries to certain roles
//   // auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER, ENUM_USER_ROLE.LOGISTICS),
//   DeliveryController.getAllDeliveries
// )

// router.get(
//   "/:id",
//   // Uncomment below if you want to restrict getSingle delivery access
//   // auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER, ENUM_USER_ROLE.LOGISTICS),
//   DeliveryController.getSingleDelivery
// )

// router.delete(
//   "/:id",
//   auth(
//     ENUM_USER_ROLE.BUYER,
//     ENUM_USER_ROLE.FARMER,
//     ENUM_USER_ROLE.LOGISTICS
//   ),
//   DeliveryController.deleteDelivery
// )

export const DeliveryRoutes = router