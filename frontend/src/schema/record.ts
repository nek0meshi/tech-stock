import { RecordStatus } from "@/generated/client/graphql";
import { z } from "@/lib/zod";
import { parseEnumValue } from "@/utils/enum";

export const RecordSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  url: z.union([z.string().url(), z.literal("")]),
  description: z.string().max(1000).optional(),
  imageUrl: z.string().optional(),
  status: z.nativeEnum(RecordStatus),
  rating: z.number().min(1).max(10),
  memo: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // readAt: z.date().optional(),
  // tags: z.array(TagSchema),
});

export const RecordFormSchema = RecordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const RecordDBSchema = RecordSchema.extend({
  status: z
    .string()
    .transform((val) => parseEnumValue(RecordStatus, val))
    .refine((val) => val !== undefined, { message: "Invalid status" }),
});

export type Record = z.infer<typeof RecordSchema>;

export type RecordFormData = z.infer<typeof RecordFormSchema>;
