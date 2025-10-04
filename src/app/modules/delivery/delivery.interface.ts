import  { Document, Types } from "mongoose"

export interface IDelivery extends Document {
  assignedBy: Types.ObjectId
  orderId: Types.ObjectId
  assignedTo: Types.ObjectId
  status: "Assigned" | "Picked Up" | "In Transit" | "Delivered" | "Cancelled"
  location: {
    type: "Point"
    coordinates: [number, number] // [longitude, latitude]
    address?: string
  }
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface DeliveryUpdates {
  status?: "Assigned" | "Picked Up" | "In Transit" | "Delivered" | "Cancelled"
  location?: {
    type: "Point"
    coordinates: [number, number]
    address?: string
  }
  notes?: string
}

// Define allowed transitions
export const allowedTransitions: Record<string, string[]> = {
  Assigned: ["Picked Up"],
  "Picked Up": ["In Transit"],
  "In Transit": ["Delivered", "Cancelled"],
  Delivered: [],
  Cancelled: [],
}