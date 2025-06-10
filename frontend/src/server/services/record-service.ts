import type { RecordFormData } from "@/schema/record";
import prisma from "@/server/lib/prisma";

export const getRecords = async () => {
  const records = await prisma.record.findMany();
  return records;
};

export const getRecord = async (id: string) => {
  const record = await prisma.record.findUnique({
    where: { id },
  });
  console.log({ record });
  return record;
};

export const createRecord = async (record: RecordFormData) => {
  const newRecord = await prisma.record.create({
    data: record,
  });
  return newRecord;
};

export const updateRecord = async (id: string, record: RecordFormData) => {
  const updatedRecord = await prisma.record.update({
    where: { id },
    data: record,
  });
  return updatedRecord;
};

export const deleteRecord = async (id: string) => {
  const deletedRecord = await prisma.record.delete({
    where: { id },
  });
  return deletedRecord;
};
