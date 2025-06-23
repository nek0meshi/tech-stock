import { z } from "@/lib/zod";

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;
