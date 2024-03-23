import { z } from "zod";

export const FilterSupplementsSchema = z.object({
  category: z
    .string()
    .min(1, { message: "It seems the category chosen is not valid" })
    .optional(),
  minPrice: z.coerce
    .number()
    .min(0, { message: "Provide a price upper than 0" })
    .optional(),
  maxPrice: z.coerce
    .number()
    .min(20000, { message: "You cannot exceed the maximum amount" })
    .optional(),
});

export const SearchSchema = z.object({
  search: z.string().min(3, {
    message: "Search must be at least 3 characters.",
  }),
});

export const OrderSchema = z.object({
  supplements: z.array(
    z.object({
      data: z.string(),
      quantity: z.number(),
    }),
  ),
  shipping: z.object({
    firstName: z.string().min(1, {
      message: "First Name is required.",
    }),
    lastName: z.string().min(1, {
      message: "Last Name is required.",
    }),
    phoneNumber: z.string().min(8, {
      message: "Please, enter a valid Phone Number.",
    }),
    wilaya: z.string().min(1, {
      message: "Wilaya is required.",
    }),
    address: z.string().min(1, {
      message: "Address is required.",
    }),
  }),
  payment: z.object({ method: z.enum(["CASH_ON_DELIVERY", "EDAHABIYA_CARD"]) }),
  discount: z.string().optional(),
  note: z.string().optional(),
});
