import type { RecordFormData } from "@/schema/record";
import prisma from "@/server/lib/prisma";
import { upsertTags } from "./tag-service";

export const getRecords = async () => {
  const records = await prisma.record.findMany();
  return records;
};

export const getRecord = async (id: string) => {
  const record = await prisma.record.findUnique({
    where: { id },
  });
  return record;
};

export const createRecord = async (record: RecordFormData) => {
  await upsertTags(record.tags);

  const tagIds = await prisma.tag.findMany({
    select: {
      id: true,
    },
    where: {
      name: {
        in: record.tags,
      },
    },
  });

  // const { tags, ...input } = record;

  const newRecord = await prisma.record.create({
    data: {
      ...record,
      tags: {
        connect: tagIds,
      },
    },
  });
  return newRecord;
};

export const updateRecord = async (id: string, record: RecordFormData) => {
  await upsertTags(record.tags);

  const tagIds = await prisma.tag.findMany({
    select: {
      id: true,
    },
    where: {
      name: {
        in: record.tags,
      },
    },
  });

  const updatedRecord = await prisma.record.update({
    where: { id },
    data: {
      ...record,
      tags: {
        connect: tagIds,
      },
    },
  });
  return updatedRecord;
};

export const deleteRecord = async (id: string) => {
  const deletedRecord = await prisma.record.delete({
    where: { id },
  });
  return deletedRecord;
};
