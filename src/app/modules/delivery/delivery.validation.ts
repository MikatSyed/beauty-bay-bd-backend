import { z } from "zod"

const statusEnum = ["Assigned", "Picked Up", "In Transit", "Delivered", "Cancelled"] as const

// GeoJSON Point schema for location
const locationSchema = z.object({
  type: z.literal("Point"),
  coordinates: z
    .tuple([z.number().min(-180).max(180), z.number().min(-90).max(90)])
    .refine((coords) => coords.length === 2, {
      message: "Coordinates must be longitude and latitude",
    }),
  address: z.string().optional(),
})

// Create Delivery schema
 const createDeliveryZodSchema = z.object({
  body: z.object({

    orderId: z.string().nonempty("orderId is required"),
    assignedTo: z.string().nonempty("assignedTo user id is required"),
    status: z.enum(statusEnum).optional().default("Assigned"),
    location: locationSchema.optional(),
    notes: z.string().max(500).optional(),
  }),
})

// Update Delivery schema (all fields optional but validated if present)
 const updateDeliveryZodSchema = z.object({
  body: z.object({
    assignedBy: z.string().optional(),
    orderId: z.string().optional(),
    assignedTo: z.string().optional(),
    status: z.enum(statusEnum).optional(),
    location: locationSchema.optional(),
    notes: z.string().max(500).optional(),
  }),
})

export const DeliveryValidation = {
  createDeliveryZodSchema,
  updateDeliveryZodSchema,
}