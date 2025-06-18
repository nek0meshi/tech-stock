"use client";

import Button from "@/components/buttons/Button";
import Toast from "@/components/feedback/toast/Toast";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import type { Record } from "@/schema/record";
import RecordCard from "./RecordCard";

export default function RecordsContent({ records }: { records: Record[] }) {
  return (
    <Container className="p-4 flex flex-col gap-4">
      <PageHeader
        title="Records"
        actions={<Button href="/records/new">Add Record</Button>}
      />
      <Toast />
      <ul className="flex flex-col gap-4">
        {records.map((record) => (
          <li key={record.id}>
            <RecordCard record={record} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
