// models/Crop.ts

import mongoose, { Schema, Document, model } from "mongoose"
import { ISubCategory } from "./sub-categories.interface"

const SubCategorySchema = new Schema<ISubCategory>({
  name: { type: String, required: true ,unique:true},
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  images: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
 
})

export default mongoose.models.SubCategory || model<ISubCategory>("SubCategory", SubCategorySchema)

