import { Booking } from './booking.model'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { BookingUpdates, IBooking } from './booking.interface'
import { User } from '../user/user.model'
import { bookingNotificationTemplate } from '../../../utils/emails/bookingNotificationTemplate'
import { sendEMail } from '../../../utils/sendMail'

// Create a new booking
const createBooking = async (data: IBooking, buyerId: string) => {
  try {
    const bookingData = {
      ...data,
      buyer_id: buyerId,
    }

    const booking = new Booking(bookingData)
    const result = await booking.save()
    const populatedBooking:any = await result.populate(['crop_id', 'farmer_id', 'buyer_id'])
    console.log(populatedBooking,'🎈🎈🎈')

    // Send email notification to farmer after successful booking
    if (populatedBooking && populatedBooking.farmer_id) {
      try {
        const farmer:any = populatedBooking.farmer_id
        const buyer:any= populatedBooking.buyer_id
        const crop:any = populatedBooking.crop_id

        // Prepare email data
        const emailData = {
          farmerName: farmer.username || farmer.name,
          farmerEmail: farmer.email,
          buyerName: buyer.username || buyer.name,
          buyerEmail: buyer.email,
          buyerPhone: buyer.phone || "Not provided",
          cropName: crop.name || crop.title,
          cropVariety: crop.variety || "Standard",
          quantity: populatedBooking.quantity,
          unit: populatedBooking.unit || "kg",
          pricePerUnit: populatedBooking.price_per_unit,
          totalAmount: populatedBooking?.total_amount,
          bookingDate: populatedBooking.createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          bookingTime: populatedBooking.createdAt.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          bookingId: populatedBooking._id.toString(),
          deliveryDate: populatedBooking.delivery_date
            ? new Date(populatedBooking.delivery_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "To be confirmed",
          deliveryAddress: populatedBooking.delivery_address || "To be confirmed",
          status: populatedBooking.status || "Pending",
          notes: populatedBooking.notes || "No additional notes",
        }

        const frontendUrl = process.env.FRONTEND_URL!
        const dashboardUrl = `${frontendUrl}/farmer/bookings`
        const supportEmail = process.env.SMTP_MAIL!
        const helpCenterUrl = "http://localhost:3001/help"
        const companyAddress = "123 Farm Lane, Greenville, CA 90001, USA"
        const phoneNumber = "+0170000000"

        const subject = `New Booking Received - Order #${emailData.bookingId.slice(-8)}`
        const htmlContent = bookingNotificationTemplate({
          ...emailData,
          dashboardUrl,
          supportEmail,
          helpCenterUrl,
          companyAddress,
          phoneNumber,
        })

        await sendEMail(process.env.SMTP_MAIL!, farmer.email, subject, htmlContent)
        console.log(`Booking notification email sent to farmer: ${farmer.email}`)
      } catch (emailError) {
        console.error("Failed to send booking notification email:", emailError)
        // Don't throw here - booking was successful, email is just a notification
      }
    }

    return populatedBooking
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}


// Get all bookings
const getAllBookings = async () => {
  return await Booking.find()
    .populate(['crop_id', 'farmer_id', 'buyer_id'])
    .sort({ createdAt: -1 })
}

// Get bookings by ID
const getBookingsById = async (bookingId: string) => {
  console.log(bookingId,'27')
   
  return await Booking.find({ _id: bookingId })
    .populate(['crop_id', 'farmer_id', 'buyer_id'])
    .sort({ createdAt: -1 })
}


// Get bookings by buyer ID
const getBookingsByBuyerId = async (buyerId: string) => {
    console.log(buyerId,'27')
  return await Booking.find({ buyer_id: buyerId })
    .populate(['crop_id', 'farmer_id', 'buyer_id'])
    .sort({ createdAt: -1 })
}

// Get bookings by farmer ID
const getBookingsByFarmerId = async (userId: string) => {
  // 1. Load the user and verify they exist
  const user = await User.findById(userId)
  if (!user) {
    throw new Error('User not found')
  }

  // 2. Build filter: farmers only get their own, admins get everything
  const filter =
    user.role === 'farmer'
      ? { farmer_id: userId }
      : user.role === 'admin'
        ? {}
        : (() => { throw new Error('Unauthorized role') })()

  // 3. Query, populate refs, sort by newest first
  return Booking.find(filter)
    .populate(['crop_id', 'farmer_id', 'buyer_id'])
    .sort({ createdAt: -1 })
}


const updateBookingStatusByFarmer = async (
  bookingId: string,
  farmerId: string,
  updates: BookingUpdates
) => {
  console.log(updates.status, '57 🙄🙄🙄');
  const booking = await Booking.findOne({ _id: bookingId, farmer_id: farmerId });
  console.log(booking, '58🥰🥰🥰');

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (
    updates.status &&
    booking.status !== 'pending' &&
    updates.status === 'pending'
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Cannot change status back to 'pending' once it's confirmed or cancelled"
    );
  }

  if (updates.status) booking.status = updates.status;

  // If you want to update payment_status as well, uncomment this:
  // if (updates.payment_status) booking.payment_status = updates.payment_status;

  await booking.save();

  return await Booking.findById(booking._id).populate([
    'crop_id',
    'farmer_id',
    'buyer_id',
  ]);
};




// Delete a booking
const deleteBooking = async (id: string) => {
  const booking = await Booking.findById(id)
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found')
  }

  return await Booking.findByIdAndDelete(id)
}

export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingsById,
  updateBookingStatusByFarmer,
  getBookingsByBuyerId,
  getBookingsByFarmerId,
  deleteBooking,
}
