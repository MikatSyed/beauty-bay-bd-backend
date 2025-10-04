import express from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validate'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'

const router = express.Router()

router.get(
  '/verify-email',
  AuthController.verifyEmail
);


router.post(
  '/forgot-password',
  AuthController.forgotPassword
);

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser
)
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
)

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)

router.patch(
  '/change-password/:id',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

router.post(
  '/reset-password',
  AuthController.resetPassword
);



export const AuthRoute = router
