import { Document, Types } from "mongoose"



export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
}


export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  admin: Types.ObjectId | string;
  images: string[];
  created_at: Date;
  updated_at?: Date;
}

export interface ICropFilters {
  searchTerm?: string;
  location?: string;
  agriculture_type?: string;
  classification?: string;
  grown_in?: string;
  farmer_id?: Types.ObjectId | string;
  [key: string]: any;
}