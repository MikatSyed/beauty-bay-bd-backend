import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import validateRequest from '../../middlewares/validateRequest'
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router()



router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN), // Updated to reflect customer and admin roles
  UserController.updateLoggedUser
)

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN), // Updated to reflect customer and admin roles
  UserController.getLoggedUser
)

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers)

// router.patch('/verify/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.verifiedToggle);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), UserController.updateUser) // Assuming only admin or customer can update users
router.get('/:id', UserController.getSingleUser)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser) // Deleting users is only for admins

// router.get('/statistic/user', auth(ENUM_USER_ROLE.ADMIN), UserController.getStatistic); // Only admin can access statistics

export const UserRoutes = router;
