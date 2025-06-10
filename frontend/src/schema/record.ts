import { RecordStatus } from "@/generated/client/graphql";
import { z } from "@/lib/zod";

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const RecordSchema = z.object({
  // id: z.string(),
  title: z.string().min(1).max(100),
  status: z.nativeEnum(RecordStatus),
  rating: z.number().min(1).max(10),
  memo: z.string(),
  // readAt: z.date().optional(),
  // tags: z.array(TagSchema),
});

export type RecordFormData = z.infer<typeof RecordSchema>;
