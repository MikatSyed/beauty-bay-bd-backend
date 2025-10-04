import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { queryHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import  Category  from './categories.model'
// import { cropsSearchableFields } from './crops.constant';
import cloudinary from 'cloudinary';
import { User } from '../user/user.model';
import { Review } from '../review/review.model';
import { ICategory } from './categories.interface';

const createCategory = async (payload: ICategory): Promise<ICategory | null> => {

    const data: any = {
     ...payload,
      images: payload.images || [],
      created_at: new Date()
    };

    const newCategory = await Category.create(data);
    return newCategory;
  
};


// const getAllCategories = async (
//   filters: ICategoryFilters,
//   queryOptions: IPaginationOptions
// ): Promise<IGenericResponse<ICategory[]>> => {
//   try {
//     const { searchTerm, ...filtersData } = filters;
//     const {
//       page,
//       limit,
//       skip,
//       sortBy,
//       sortOrder,
//       minPrice,
//       maxPrice,
//     } = queryHelpers.calculateQuery(queryOptions);

//     const andConditions: any[] = [];

//     if (searchTerm) {
//       andConditions.push({
//         $or: cropsSearchableFields.map((field) => ({
//           [field]: {
//             $regex: searchTerm,
//             $options: "i",
//           },
//         })),
//       });
//     }

//     if (minPrice !== undefined || maxPrice !== undefined) {
//       const priceCondition: { $gte?: number; $lte?: number } = {};
//       if (minPrice !== undefined) priceCondition.$gte = minPrice;
//       if (maxPrice !== undefined) priceCondition.$lte = maxPrice;
//       andConditions.push({ price_per_unit: priceCondition });
//     }

//     if (Object.keys(filtersData).length) {
//       andConditions.push({
//         $and: Object.entries(filtersData).map(([field, value]) =>
//           Array.isArray(value) ? { [field]: { $in: value } } : { [field]: value }
//         ),
//       });
//     }

//     const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

//     const sortConditions: { [key: string]: 1 | -1 } = {};
//     sortConditions[sortBy || "created_at"] = sortOrder === "asc" ? 1 : -1;

//     const crops = await Crop.find(whereConditions, {
//     description: 0,
//     benefits: 0,
//     __v :0
//     })
//       .populate("farmer_id", "username address farm_name produce_types farm_size")
//       .sort(sortConditions)
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Crop.countDocuments(whereConditions);

//     // 🔁 Loop through crops and fetch reviews for each farmer
// // 🔁 Loop through crops and calculate average rating per farmer
// for (const crop of crops) {
//   const farmerId = crop.farmer_id?._id || crop.farmer_id;
//   const reviews = await Review.find({ farmerId }).lean();

//   const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//   const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

//   crop.averageRating = averageRating;

//   console.log(`Crop ID: ${crop._id}, Avg Rating: ${averageRating.toFixed(2)}`);
// }

//     return {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Crops retrieved successfully!",
//       meta: {
//         page,
//         limit,
//         total,
//       },
//       data: crops,
//     };
//   } catch (error) {
//     throw new ApiError(
//       httpStatus.INTERNAL_SERVER_ERROR,
//       "Error retrieving crops",
//       error instanceof Error ? error.message : String(error)
//     );
//   }
// };

const getAllCategories = async (): Promise<ICategory[]> => {
  const result = await Category.find()
  return result;
};

// const getSingleCrops = async (id: string): Promise<ICategory | null> => {
//   const result = await Crop.findById(id).populate('farmer_id')
//   return result;
// };

// const updateCrops = async (
//   id: string,
//   payload: Partial<ICategory>
// ): Promise<ICategory | null> => {
//   const isExist = await Crop.findOne({ _id: id });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Crop not found!');
//   }
//   const {images,...rest} = payload; 
//   const updatedCropData: Partial<ICategory> = { ...rest };

//   const result = await Crop.findOneAndUpdate({ _id: id }, updatedCropData, {
//     new: true,
//   })
//   return result;
// };

// const deleteCrops = async (id: string): Promise<ICategory | null> => {
//   const result = await Crop.findByIdAndDelete({ _id: id })
//   return result;
// };

export const CategoryService = {
  createCategory,
  getAllCategories
//   getAllCrops,
//   getAllCropsForFarmer,
//   getSingleCrops,
//   updateCrops,
//   deleteCrops,
};
