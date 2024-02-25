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
  price: z.string().min(0, { message: "Please, enter a valid price" }),
  stock: z.string().min(0, { message: "Please, enter a valid stock" }),
  description: z.string().optional(),
  files: z
    .array(
      z
        .custom<File>()
        .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
          message: "Each thumbnail can be a maximum of 10MB.",
        })
        .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
          message: "Only images are allowed to be sent.",
        }),
    )
    .optional(),
});
