// Categorys.validate.ts

import { z } from 'zod'
// import {
//   agricultureTypes,
//   CategoryCategories,
//   quantityUnits,
//   growingEnvironments,
// } from './Categorys.constant'

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string(),
    images: z.array(z.string()),
    admin: z.string(), 
  }),
})

// const updateCategoryZodSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     location: z.string().optional(),
//     agriculture_type: z.enum([...agricultureTypes] as [string, ...string[]]).optional(),
//     classification: z.enum([...CategoryCategories] as [string, ...string[]]).optional(),
//     quantity_available: z.number().int().positive().optional(),
//     quantity_unit: z.enum([...quantityUnits] as [string, ...string[]]).optional(),
//     packaging: z.string().optional(),
//     price_per_unit: z.number().positive().optional(),
//     harvest_date: z.string().optional(),
//     // images: z.array(z.string()).optional(),
//     newImages: z.array(z.string()).optional(),
//     grown_in: z.enum([...growingEnvironments] as [string, ...string[]]).optional(),
//     farmer_id: z.string().optional(),
//   }),
// })

export const CategoryValidation = {
  createCategoryZodSchema,
//   updateCategoryZodSchema,
}
