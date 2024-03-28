import z from "zod";

export const JournalArticlesSchema = z
  .object({
    name: z.string().trim().min(1, { message: "This field is required." }),
    body: z.string().trim().min(1, { message: "This field is required." }),
    categoryId: z.string(),
    published: z.boolean(),
  })
  .strict();
