import type { RecordStatus, Tag } from "@/generated/client/graphql";

export interface RecordFormData {
  title: string;
  rating: number;
  status: RecordStatus;
  memo: string;
  tags: Tag[];
}
