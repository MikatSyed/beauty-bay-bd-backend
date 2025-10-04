import { z } from "zod";

const statusEnum = ["Assigned", "Picked Up", "In Transit", "Delivered", "Cancelled"] as const;

// GeoJSON Point schema for location (optional, if you want location tracking)
const locationSchema = z.object({
  type: z.literal("Point"),
  coordinates: z
    .tuple([z.number().min(-180).max(180), z.number().min(-90).max(90)])
    .refine((coords) => coords.length === 2, {
      message: "Coordinates must be longitude and latitude",
    }),
  address: z.string().optional(),
});

// Create Tracking schema
const createTrackingZodSchema = z.object({
  body: z.object({
    orderId: z.string().nonempty("orderId is required"),
    deliveryId: z.string().nonempty("deliveryId is required"),
    logisticId: z.string().nonempty("logisticId (user) is required"),
    status: z.enum(statusEnum).optional().default("Assigned"),
    location: locationSchema.optional(),
    notes: z.string().max(500).optional(),
  }),
});

// Update Tracking schema (all fields optional but validated if present)
const updateTrackingZodSchema = z.object({
  body: z.object({
    orderId: z.string().optional(),
    deliveryId: z.string().optional(),
    logisticId: z.string().optional(),
    status: z.enum(statusEnum).optional(),
    location: locationSchema.optional(),
    notes: z.string().max(500).optional(),
  }),
});

export const TrackingValidation = {
  createTrackingZodSchema,
  updateTrackingZodSchema,
};
