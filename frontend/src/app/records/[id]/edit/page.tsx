import { RecordDBSchema } from "@/schema/record";
import { getRecord } from "@/server/services/record-service";
import { getTags } from "@/server/services/tag-service";
import { redirect } from "next/navigation";
import EditRecordContent from "./_components/EditRecordContent";

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const record = await getRecord(id);
  const tags = await getTags();

  if (!record) {
    redirect("/records?toastVariant=error&toastMessage=Record not found");
  }

  const parsedRecord = RecordDBSchema.safeParse(record);

  if (!parsedRecord.success) {
    console.error(parsedRecord.error);
    redirect("/records?toastVariant=error&toastMessage=Invalid record");
  }

  return <EditRecordContent record={parsedRecord.data} tags={tags} />;
}
