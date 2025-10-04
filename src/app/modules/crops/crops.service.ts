import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { queryHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { ICrop, ICropFilters } from './crops.interface';
import  Crop  from './crops.model'
import { cropsSearchableFields } from './crops.constant';
import cloudinary from 'cloudinary';
import { User } from '../user/user.model';
import { Review } from '../review/review.model';

const createCrops = async (payload: ICrop): Promise<ICrop | null> => {
  try {
    // console.log(payload);
    // let uploadedImageUrls: string[] = [];

    // if (payload.images && payload.images.length > 0) {
    //   const uploadPromises = payload.images.map(img =>
    //     cloudinary.v2.uploader.upload(img, {
    //       folder: 'Fruto/Crops',
    //     })
    //   );

    //   const results = await Promise.all(uploadPromises);
    //   uploadedImageUrls = results.map(result => result.secure_url);
    // }

    const newCropData: any = {
     ...payload,
      images: payload.images || [],
      created_at: new Date()
    };

    const newCrop = await Crop.create(newCropData);
    return newCrop;
  } catch (error) {
    console.error("Error creating crop:", error);
    return null;
  }
};


const getAllCrops = async (
  filters: ICropFilters,
  queryOptions: IPaginationOptions
): Promise<IGenericResponse<ICrop[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters;
    const {
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
    } = queryHelpers.calculateQuery(queryOptions);

    const andConditions: any[] = [];

    if (searchTerm) {
      andConditions.push({
        $or: cropsSearchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        })),
      });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceCondition: { $gte?: number; $lte?: number } = {};
      if (minPrice !== undefined) priceCondition.$gte = minPrice;
      if (maxPrice !== undefined) priceCondition.$lte = maxPrice;
      andConditions.push({ price_per_unit: priceCondition });
    }

    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) =>
          Array.isArray(value) ? { [field]: { $in: value } } : { [field]: value }
        ),
      });
    }

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

    const sortConditions: { [key: string]: 1 | -1 } = {};
    sortConditions[sortBy || "created_at"] = sortOrder === "asc" ? 1 : -1;

    const crops = await Crop.find(whereConditions, {
    description: 0,
    benefits: 0,
    __v :0
    })
      .populate("farmer_id", "username address farm_name produce_types farm_size")
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Crop.countDocuments(whereConditions);

    // 🔁 Loop through crops and fetch reviews for each farmer
// 🔁 Loop through crops and calculate average rating per farmer
for (const crop of crops) {
  const farmerId = crop.farmer_id?._id || crop.farmer_id;
  const reviews = await Review.find({ farmerId }).lean();

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  crop.averageRating = averageRating;

  console.log(`Crop ID: ${crop._id}, Avg Rating: ${averageRating.toFixed(2)}`);
}

    return {
      statusCode: httpStatus.OK,
      success: true,
      message: "Crops retrieved successfully!",
      meta: {
        page,
        limit,
        total,
      },
      data: crops,
    };
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error retrieving crops",
      error instanceof Error ? error.message : String(error)
    );
  }
};
const getAllCropsForFarmer = async (
  filters: ICropFilters,
  queryOptions: IPaginationOptions,
  userId: string
): Promise<IGenericResponse<ICrop[]>> => {
  try {
    // 1. Load & check user
    const user = await User.findById(userId)
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    if (!['farmer', 'admin'].includes(user.role)) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized role')
    }

    // 2. Unpack filters & pagination
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice } =
      queryHelpers.calculateQuery(queryOptions)

    // 3. Build Mongo AND conditions
    const andConditions: any[] = []

    // 3a. If farmer → limit to their own crops
    if (user.role === 'farmer') {
      andConditions.push({ farmer_id: userId })
    }

    // 3b. Search-term across searchable fields
    if (searchTerm) {
      andConditions.push({
        $or: cropsSearchableFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' }
        }))
      })
    }

    // 3c. Price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceCond: { $gte?: number; $lte?: number } = {}
      if (minPrice !== undefined) priceCond.$gte = minPrice
      if (maxPrice !== undefined) priceCond.$lte = maxPrice
      andConditions.push({ price_per_unit: priceCond })
    }

    // 3d. Any other filters (arrays → $in)
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) =>
          Array.isArray(value)
            ? { [field]: { $in: value } }
            : { [field]: value }
        )
      })
    }

    // 4. Combine into a single where clause
    const where = andConditions.length ? { $and: andConditions } : {}

    // 5. Sorting
    const sort: Record<string, 1 | -1> = {}
    if (sortBy && sortOrder) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1
    } else {
      sort['created_at'] = -1
    }

    // 6. Execute the query + count for meta
    const [crops, total] = await Promise.all([
      Crop.find(where).sort(sort).skip(skip).limit(limit),
      Crop.countDocuments(where)
    ])

    // 7. Return in your generic response shape
    return {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Crops retrieved successfully!',
      meta: { page, limit, total },
      data: crops
    }
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error retrieving crops',
      error instanceof Error ? error.message : String(error)
    )
  }
}
const getSingleCrops = async (id: string): Promise<ICrop | null> => {
  const result = await Crop.findById(id).populate('farmer_id')
  return result;
};

const updateCrops = async (
  id: string,
  payload: Partial<ICrop>
): Promise<ICrop | null> => {
  const isExist = await Crop.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crop not found!');
  }
  const {images,...rest} = payload; 
  const updatedCropData: Partial<ICrop> = { ...rest };

  const result = await Crop.findOneAndUpdate({ _id: id }, updatedCropData, {
    new: true,
  })
  return result;
};

const deleteCrops = async (id: string): Promise<ICrop | null> => {
  const result = await Crop.findByIdAndDelete({ _id: id })
  return result;
};

export const CropsService = {
  createCrops,
  getAllCrops,
  getAllCropsForFarmer,
  getSingleCrops,
  updateCrops,
  deleteCrops,
};
