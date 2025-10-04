import { z } from "zod"

const farmerReviewZodSchema = z.object({
  body: z.object({

    userId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters"),
    isAnonymous: z.boolean(),
  }),
})

export const FarmerReviewValidation = {
  farmerReviewZodSchema,
}
