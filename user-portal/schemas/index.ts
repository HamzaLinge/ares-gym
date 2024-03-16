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