"use client";

import Button from "@/components/buttons/Button";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import { GetRecordsDocument } from "@/generated/client/graphql";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "urql";

export default function Records() {
  const [result] = useQuery({
    query: GetRecordsDocument,
  });

  const records = useMemo(() => result.data?.records ?? [], [result.data]);

  return (
    <Container className="p-4 flex flex-col gap-4">
      <PageHeader
        title="Records"
        actions={<Button href="/records/new">Add Record</Button>}
      />
      <ul className="flex flex-col gap-4">
        {records.map((record) => (
          <li key={record.id}>
            <div className="card card-bordered bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">
                  <Link href={`/records/${record.id}`}>{record.title}</Link>
                </h3>
                <p>{record.memo}</p>
                <div className="flex justify-end">
                  <Button
                    href={`/records/${record.id}/edit`}
                    variant="secondary"
                    size="sm"
                    outline
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
