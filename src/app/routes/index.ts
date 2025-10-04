import express from 'express'
import { UserRoutes } from '../modules/user/user.route'

import { AuthRoute } from '../modules/auth/auth.route'
import { CropsRoutes } from '../modules/crops/crops.route'
import { ReviewRoutes } from '../modules/review/review.route'
import { BookingRoutes } from '../modules/booking/booking.route'
import { DeliveryRoutes } from '../modules/delivery/delivery.route'
import { TrackingRoutes } from '../modules/tracking/tracking.route'
import { FarmerReviewRoutes } from '../modules/farmer-review/farmer-review.route'
import { CategoryRoutes } from '../modules/categories/categories.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
 
  {
    path: '/users',
    route: UserRoutes,
  }
  ,
 
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  
  // {
  //   path: '/reviews',
  //   route: ReviewRoutes,
  // },
  // {
  //   path: '/farmer-reviews',
  //   route: FarmerReviewRoutes,
  // },
  // {
  //   path: '/bookings',
  //   route: BookingRoutes,
  // },
  // {
  //   path: '/delivery',
  //   route: DeliveryRoutes,
  // }
  // ,
  // {
  //   path: '/tracking',
  //   route: TrackingRoutes,
  // }
  
 
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
