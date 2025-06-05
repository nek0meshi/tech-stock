"use client";

import Container from "@/components/layout/Container";
import PageTitle from "@/components/typography/PageTitle";
import { range } from "@/utils/array";
import Link from "next/link";

type Record = {
  id: string;
  title: string;
  tags: string[];
  status: "unread" | "reading" | "read";
  rating: number;
  memo: string;
  createdAt: string;
  updatedAt: string;
};

export default function Records() {
  const records: Record[] = range(1, 10).map((i) => ({
    id: i.toString(),
    title: `React vs Vue.js ${i}`,
    tags: ["tag1", "tag2"],
    status: "unread",
    rating: 5,
    memo: "ためになった。ためになった。ためになった。ためになった。ためになった。ためになった。ためになった。ためになった。",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  }));

  return (
    <Container className="p-4">
      <PageTitle>Records</PageTitle>
      <ul className="flex flex-col gap-4">
        {records.map((record) => (
          <li key={record.id}>
            <div className="card card-bordered bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">
                  <Link href={`/records/${record.id}`}>{record.title}</Link>
                </h3>
                <p>{record.memo}</p>
                <div>
                  <button className="btn btn-primary">Read</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
