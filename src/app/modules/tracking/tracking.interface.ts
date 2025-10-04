import { Types } from "mongoose";

export interface ITracking extends Document {
  orderId: Types.ObjectId;
  deliveryId: Types.ObjectId;
  logisticId: Types.ObjectId;
  status: "Assigned" | "Picked Up" | "In Transit" | "Delivered" | "Cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
