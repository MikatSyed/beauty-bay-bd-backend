// models/Crop.ts

import mongoose, { Schema, Document, model } from "mongoose"
import { ICrop } from "./crops.interface"



// Define the Crop schema with additional fields for original_price, description, and benefits
const CropSchema = new Schema<ICrop>({
  name: { type: String, required: true },
  farmer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  images: { type: [String], default: [] },
  price_per_unit: { type: Number, required: true },
  original_price: { type: Number, required: true },
  quantity_available: { type: Number, required: true },
  quantity_unit: { type: String, required: true },
  location: { type: String, required: true },
  agriculture_type: { type: String,required: true},
  classification: {type: String,
    enum: ["Fruits", "Vegetables", "Grains", "Nuts", "Herbs", "Other"],
    required: true,
  },
  packaging: { type: String, required: true },
  harvest_date: { type: Date, required: true },
  description: { type: String, required: false },
  benefits: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
  grown_in: {type: String, required: true,},
})

export default mongoose.models.Crop || model<ICrop>("Crop", CropSchema)

