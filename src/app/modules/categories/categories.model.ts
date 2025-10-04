// models/Crop.ts

import mongoose, { Schema, Document, model } from "mongoose"
import { ICategory } from "./categories.interface"

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true ,unique:true},
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  images: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
 
})

export default mongoose.models.Category || model<ICategory>("Category", CategorySchema)

