import type { CreateRecordInput, UpdateRecordInput } from "@/generated/graphql";
import {
  type RecordDBCreateInput,
  RecordDBCreateSchema,
  RecordDBUpdateSchema,
} from "@/schema/record";
import prisma from "@/server/lib/prisma";
import { upsertTags } from "./tag-service";

export const getRecords = async () => {
  const records = await prisma.record.findMany({
    include: {
      tags: true,
    },
  });
  return records;
};

export const getRecord = async (id: string) => {
  const record = await prisma.record.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });
  return record;
};

export const createRecord = async (record: CreateRecordInput) => {
  await upsertTags(record.tags);

  const tags = await prisma.tag.findMany({
    select: {
      id: true,
    },
    where: {
      name: {
        in: record.tags,
      },
    },
  });

  const inputBeforeParse: RecordDBCreateInput = {
    ...record,
    // 現在未使用
    description: "",
    tags: tags.map((tag) => ({ id: tag.id })),
    // tags
  };

  const input = RecordDBCreateSchema.parse(inputBeforeParse);

  const newRecord = await prisma.record.create({
    data: input,
  });
  return newRecord;
};

export const updateRecord = async (id: string, record: UpdateRecordInput) => {
  await upsertTags(record.tags);

  const tags = await prisma.tag.findMany({
    select: {
      id: true,
    },
    where: {
      name: {
        in: record.tags,
      },
    },
  });

  const input = RecordDBUpdateSchema.parse({
    ...record,
    // 現在未使用
    description: "",
    tags: tags.map((tag) => ({ id: tag.id })),
  });

  const updatedRecord = await prisma.record.update({
    where: { id },
    data: input,
  });
  return updatedRecord;
};

export const deleteRecord = async (id: string) => {
  const deletedRecord = await prisma.record.delete({
    where: { id },
  });
  return deletedRecord;
};
