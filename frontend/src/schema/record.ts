import { RecordStatus } from "@/generated/client/graphql";
import { z } from "@/lib/zod";
import { parseEnumValue } from "@/utils/enum";
import { TagSchema } from "./tag";

export const RecordSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  url: z.union([z.string().url(), z.literal("")]),
  description: z.string().max(1000).nullable().optional(),
  imageUrl: z.string(),
  objectKey: z.string(),
  status: z.nativeEnum(RecordStatus),
  rating: z.number().min(1).max(10),
  memo: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // readAt: z.date().optional(),
  tags: z.array(TagSchema),
});

export const RecordFormSchema = RecordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// export const RecordCreateSchema = RecordSchema.omit({
//   id: true,
//   createdAt: true,
//   updatedAt: true,
//   tags: true,
// }).extend({
//   tags: z.array(z.string()),
// });

// export const RecordUpdateSchema = RecordSchema.omit({
//   id: true,
//   createdAt: true,
//   updatedAt: true,
//   tags: true,
// }).extend({
//   tags: z.array(z.string()),
// });

export const RecordDBSchema = RecordSchema.extend({
  status: z
    .string()
    .transform((val) => parseEnumValue(RecordStatus, val))
    .refine((val) => val !== undefined, { message: "Invalid status" }),
});

export const RecordDBCreateSchema = RecordDBSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tags: true,
}).extend({
  description: z
    .string()
    .max(1000)
    .nullable()
    .optional()
    .transform((val) => val ?? ""),
  tags: z
    .array(z.object({ id: z.string() }))
    .transform((val) => ({ connect: val })),
});

export const RecordDBUpdateSchema = RecordDBSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tags: true,
}).extend({
  description: z
    .string()
    .max(1000)
    .nullable()
    .optional()
    .transform((val) => val ?? ""),

  tags: z
    .array(z.object({ id: z.string() }))
    .transform((val) => ({ set: val })),
});

export type Record = z.infer<typeof RecordSchema>;

export type RecordFormData = z.infer<typeof RecordFormSchema>;

// export type RecordCreateData = z.infer<typeof RecordCreateSchema>;

// export type RecordUpdateData = z.infer<typeof RecordUpdateSchema>;

export type RecordDBCreateInput = z.input<typeof RecordDBCreateSchema>;
