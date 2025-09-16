import { z } from 'zod';

export const todoSchema = z.object({
  /**
   * @todo: Add the validation for the title and the description
   * - Title: required, min 3 characters, max 20 characters
   * - Description: required, min 3 characters, max 100 characters
   */
  title: z.string().min(3,"Min char is 3").max(20, "Max char is 20"),
  description: z.string().min(3,"Min char is 3").max(100, "Max char is 20"),
});

export type TodoSchemaType = z.infer<typeof todoSchema>;
