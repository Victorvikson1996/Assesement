import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, 'Phone number or email is required')
    .max(100, 'Must be less than 100 characters')
    .refine(
      (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9+\-\s().]{6,}$/;
        return emailRegex.test(val) || phoneRegex.test(val);
      },
      {
        message: 'Enter a valid phone number or email'
      }
    ),
  password: z
    .string()
    .min(6, 'Password is required')
    .max(64, 'Password must be less than 64 characters')
});

export type LoginFormData = z.infer<typeof loginSchema>;
