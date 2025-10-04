import { z } from 'zod'


 const createUserZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    fname: z.string(),
    lname: z.string(),
    image: z.array(z.string()).optional(), // Adjusted for array of strings
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip_code: z.string().optional(),
    country: z.string().optional(),
    
    isVerified: z.boolean().optional(), // Optional isVerified flag

    verificationToken: z.string().optional(),
    verificationTokenExpire: z.date().optional(),
    
    // Password reset fields
    resetPasswordToken: z.string().optional(),
    resetPasswordExpire: z.date().optional(),
 
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})


const changePasswordZodSchema = z.object({
  body: z.object({
    newPassword: z.string({
      required_error: 'New password is required',
    }),
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema
}
