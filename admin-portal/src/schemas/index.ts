import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export const CategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required and must be at least 3 characters" }),
  description: z
    .string()
    .min(6, { message: "Make sure the description is properly provided" })
    .optional(),
  parent: z.string().nullable().optional(),
});
export const SupplementSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is requires and must be at least 3 characters" }),
  category: z.string(),
  price: z.string().min(3, { message: "Please, enter a valid price" }),
  stock: z.string().min(1, { message: "Please, enter a valid stock" }),
  description: z
    .string()
    // .min(6, { message: "Make sure the description is properly provided" })
    .optional(),
});
