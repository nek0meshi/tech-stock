"use client";

import Button from "@/components/buttons/Button";
import RecordForm from "@/components/features/records/RecordForm";
import Container from "@/components/layout/Container";
import BreadcrumbItem from "@/components/nav/BreadcrumbItem";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import PageTitle from "@/components/typography/PageTitle";
import type { RecordFormData } from "@/features/records/typs";
import {
  GetRecordDocument,
  type GetRecordQuery,
  type GetRecordQueryVariables,
  UpdateRecordDocument,
} from "@/generated/client/graphql";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";

export default function EditRecord() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [result] = useQuery<GetRecordQuery, GetRecordQueryVariables>({
    query: GetRecordDocument,
    variables: { id },
  });
  const [_, updateRecord] = useMutation(UpdateRecordDocument);
  const record = useMemo(() => result.data?.record, [result.data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecordFormData>();

  const onSubmit = (data: RecordFormData) => {
    console.log(data);

    updateRecord({
      id,
      input: {
        title: data.title,
        rating: data.rating,
        status: data.status,
        memo: data.memo,
      },
    });
  };

  useEffect(() => {
    if (result.data?.record) {
      reset(result.data.record);
    }
  }, [result.data?.record, reset]);

  if (result.fetching) return <div>Loading...</div>;
  if (result.error) return <div>Error: {result.error.message}</div>;
  if (!record) return <div>Record not found</div>;

  return (
    <Container className="p-4 flex flex-col gap-4">
      <div className="flex flex-col">
        <Breadcrumbs>
          <BreadcrumbItem href="/records">Records</BreadcrumbItem>
          <BreadcrumbItem href={`/records/${record.id}`}>
            {record.title}
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex items-center justify-between">
          <PageTitle>{record.title}</PageTitle>
          <Button variant="error" size="sm" outline>
            Delete
          </Button>
        </div>
      </div>
      <RecordForm
        handleSubmit={handleSubmit(onSubmit)}
        handleCancel={() => router.back()}
        register={register}
      />
    </Container>
  );
}
