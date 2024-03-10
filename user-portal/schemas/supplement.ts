import { z } from "zod";

export const FilterSupplementsSchema = z.object({
  minPrice: z.coerce
    .number()
    .min(0, { message: "Provide a price upper than 0" })
    .optional(),
  maxPrice: z.coerce
    .number()
    .min(20000, { message: "You cannot exceed the maximum amount" })
    .optional(),
});
