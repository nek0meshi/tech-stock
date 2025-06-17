import { RecordDBSchema } from "@/schema/record";
import { getRecord } from "@/server/services/record-service";
import EditRecordContent from "./_components/EditRecordContent";

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const record = await getRecord(id);

  console.log({ record });

  if (!record) {
    return <div>Record not found</div>;
  }

  const parsedRecord = RecordDBSchema.safeParse(record);

  if (!parsedRecord.success) {
    console.error(parsedRecord.error);
    return <div>Invalid record</div>;
  }

  return <EditRecordContent record={parsedRecord.data} />;
}
