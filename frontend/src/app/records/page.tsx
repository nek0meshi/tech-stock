import { RecordDBSchema } from "@/schema/record";
import { getRecords } from "@/server/services/record-service";
import RecordsContent from "./_components/RecordsContent";

export default async function Page() {
  const records = await getRecords();

  const parsedRecords = records
    .map((record) => RecordDBSchema.safeParse(record))
    .filter((result) => result.success)
    .map((result) => result.data);

  return <RecordsContent records={parsedRecords} />;
}
