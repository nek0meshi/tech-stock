"use client";

import Container from "@/components/layout/Container";
import PageTitle from "@/components/typography/PageTitle";
import Link from "next/link";
import { useMemo } from "react";
import { gql, useQuery } from "urql";

export default function Records() {
  const [result] = useQuery({
    query: gql`
      query {
        records { id title tags { id name } status rating memo createdAt updatedAt }
      }
    `,
  });

  const records = useMemo(() => result.data?.records ?? [], [result.data]);

  return (
    <Container className="p-4 flex flex-col gap-4">
      <PageTitle>Records</PageTitle>
      <div className="flex gap-4 justify-end">
        <button type="button" className="btn btn-primary">
          Add Record
        </button>
      </div>
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
                  <button type="button" className="btn btn-outline btn-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
