import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { allowedTransitions, DeliveryUpdates, IDelivery } from "./delivery.interface"
import Delivery from "./delivery.model"
import mongoose from "mongoose"
import { Booking } from "../booking/booking.model"

import Tracking from "../tracking/tracking.model"  // adjust path as needed

async function createDelivery(
  assignedBy: string,
  deliveryPayload: Partial<IDelivery>,
  bookingId: string
): Promise<IDelivery | null> {
  console.log(deliveryPayload, '13😮')
  const { assignedTo } = deliveryPayload
  console.log(assignedTo, '😘')
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // 1. Create delivery with session
    const newDelivery = await Delivery.create(
      [
        {
          ...deliveryPayload,
          orderId: bookingId,
          assignedBy,
          createdAt: new Date(),
        },
      ],
      { session }
    )
    console.log(newDelivery, '😎😎😎')
    if (!newDelivery || newDelivery.length === 0) {
      throw new Error("Failed to create delivery")
    }

    // 2. Update booking's delivery_id to newDelivery._id
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { delivery_id: newDelivery[0]._id },
      { new: true, session }
    )

    if (!updatedBooking) {
      throw new ApiError(400, "Booking not found or failed to update")
    }

    // 3. Create Tracking document with status from delivery
    const newTracking = await Tracking.create(
      [
        {
          orderId: bookingId,
          deliveryId: newDelivery[0]._id,
          logisticId: assignedTo,
          status: newDelivery[0].status || "Assigned",
          // optionally add location or notes if needed
        },
      ],
      { session }
    )

    if (!newTracking || newTracking.length === 0) {
      throw new Error("Failed to create tracking")
    }

    // 4. Commit transaction
    await session.commitTransaction()
    session.endSession()

    return newDelivery[0]
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}


const getDeliveryByLogisticId = async (logisticId: string) => {
   console.log(logisticId,'😘')
  return await Delivery.find({assignedTo:logisticId})
    .populate(['assignedBy', 'orderId',])
    .sort({ createdAt: -1 })
}




const updateDeliveryStatusByLogistic = async (
  deliveryId: string,
  logisticId: string,
  updates: DeliveryUpdates
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const delivery = await Delivery.findOne({ _id: deliveryId, assignedTo: logisticId }).session(session);

    if (!delivery) {
      throw new ApiError(httpStatus.NOT_FOUND, "Delivery not found");
    }

    if (updates.status) {
      const currentStatus = delivery.status;
      const nextStatus = updates.status;

      const validNextStatuses = allowedTransitions[currentStatus];
      if (!validNextStatuses.includes(nextStatus)) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `The delivery status must follow the sequence: Assigned → Picked Up → In Transit → Delivered. You tried to go from ${currentStatus}’ to ${nextStatus}’, which isn’t allowed`
        );
      }

      delivery.status = nextStatus;
    }

    if (updates.location) delivery.location = updates.location;
    if (updates.notes) delivery.notes = updates.notes;

    await delivery.save({ session });

    await Tracking.create(
      [
        {
          orderId: delivery.orderId,
          deliveryId: delivery._id,
          logisticId,
          status: delivery.status,
          location: updates.location,
          notes: updates.notes,
          createdAt: new Date(),
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return await Delivery.findById(delivery._id).populate(["assignedBy", "orderId"]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};



export const DeliveryService = {
  createDelivery,
  getDeliveryByLogisticId,
  updateDeliveryStatusByLogistic
}