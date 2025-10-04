import mongoose, { Schema, Document, Model, Types } from "mongoose"
import { IDelivery } from "./delivery.interface"



const DeliverySchema: Schema<IDelivery> = new Schema(
  {
    assignedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["Assigned", "Picked Up", "In Transit", "Delivered", "Cancelled"],
      default: "Assigned",
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
       
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
       
      },
      address: {
        type: String,
      },
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  },
)

// Geospatial index for location
DeliverySchema.index({ location: "2dsphere" })

const Delivery: Model<IDelivery> = mongoose.models.Delivery || mongoose.model<IDelivery>("Delivery", DeliverySchema)

export default Delivery
