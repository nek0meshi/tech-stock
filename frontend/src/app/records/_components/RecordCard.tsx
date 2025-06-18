import Button from "@/components/buttons/Button";
import ExternalLink from "@/components/nav/ExternalLink";
import type { Record } from "@/schema/record";
import Link from "next/link";

interface RecordCardProps {
  record: Record;
}

export default function RecordCard({ record }: RecordCardProps) {
  return (
    <div className="card card-bordered bg-base-100 shadow-sm">
      <div className="card-body">
        <div>
          <h3 className="card-title">
            <Link href={`/records/${record.id}/edit`}>{record.title}</Link>
          </h3>
          {record.url && (
            <ExternalLink
              href={record.url}
              className="text-xs text-gray-400 truncate inline-block max-w-full"
            >
              {record.url}
            </ExternalLink>
          )}
        </div>
        <p className="text-sm text-gray-500 max-h-[60px] overflow-hidden">
          {record.memo}
        </p>
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
  );
}
