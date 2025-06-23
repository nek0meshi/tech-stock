import { getTags } from "@/server/services/tag-service";
import NewRecordContent from "./_components/NewRecordContent";

export default async function NewRecord() {
  const tags = await getTags();

  console.log(tags);

  return <NewRecordContent />;
}
