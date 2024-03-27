import z from "zod";

export const JournalCategoriesSchema = z
  .object({
    name: z.string().trim().min(1, { message: "This field is required." }),
    description: z
      .string()
      .trim()
      .min(1, { message: "This field is required." }),
    published: z.boolean(),
  })
  .strict();
