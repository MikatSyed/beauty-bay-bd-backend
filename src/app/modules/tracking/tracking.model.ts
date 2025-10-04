import mongoose, { Schema, Model } from "mongoose";
import { ITracking } from "./tracking.interface";


const TrackingSchema: Schema<ITracking> = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Booking", 
      required: true,
    },
    deliveryId: {
      type: Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },
    logisticId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Assigned", "Picked Up", "In Transit", "Delivered", "Cancelled"],
      required: true,
      default: "Assigned",
    },
  },
  {
    timestamps: true, 
  }
);

const Tracking: Model<ITracking> =
  mongoose.models.Tracking || mongoose.model<ITracking>("Tracking", TrackingSchema);

export default Tracking;
