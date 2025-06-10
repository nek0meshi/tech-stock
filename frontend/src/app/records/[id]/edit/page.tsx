"use client";

import Button from "@/components/buttons/Button";
import RecordForm from "@/components/features/records/RecordForm";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import useConfirmModal from "@/components/modals/ConfirmModal/useConfirmModal";
import DeleteModal from "@/components/modals/DeleteModal";
import BreadcrumbItem from "@/components/nav/BreadcrumbItem";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import {
  DeleteRecordDocument,
  GetRecordDocument,
  type GetRecordQuery,
  type GetRecordQueryVariables,
  UpdateRecordDocument,
} from "@/generated/client/graphql";
import { type RecordFormData, RecordSchema } from "@/schema/record";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";

export default function EditRecord() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const confirmModal = useConfirmModal();

  const [result] = useQuery<GetRecordQuery, GetRecordQueryVariables>({
    query: GetRecordDocument,
    variables: { id },
  });
  const updateRecord = useMutation(UpdateRecordDocument)[1];
  const deleteRecord = useMutation(DeleteRecordDocument)[1];
  const record = useMemo(() => result.data?.record, [result.data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecordFormData>({
    resolver: zodResolver(RecordSchema),
  });

  console.log({ errors });

  const onSubmit = async (data: RecordFormData) => {
    console.log(data);

    const result = await updateRecord({
      id,
      input: {
        title: data.title,
        rating: data.rating,
        status: data.status,
        memo: data.memo,
      },
    });

    console.log({ result });

    if (result.error) {
      console.error(result.error);

      return;
    }

    router.push("/records");
  };

  const handleDelete = async () => {
    const confirmResult = await confirmModal.confirm();

    if (!confirmResult) {
      return;
    }

    const result = await deleteRecord({ id });

    if (result.error) {
      console.error(result.error);

      return;
    }

    router.push("/records");
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
      <PageHeader
        title={record.title}
        breadcrumbItems={
          <Breadcrumbs>
            <BreadcrumbItem href="/records">Records</BreadcrumbItem>
            <BreadcrumbItem>{record.title}</BreadcrumbItem>
          </Breadcrumbs>
        }
        actions={
          <Button variant="error" size="sm" outline onClick={handleDelete}>
            Delete
          </Button>
        }
      />
      <RecordForm
        handleSubmit={handleSubmit(onSubmit)}
        handleCancel={() => router.back()}
        register={register}
        errors={errors}
      />
      <DeleteModal
        target={record.title}
        isOpen={confirmModal.open}
        onConfirm={confirmModal.handleConfirm}
      />
    </Container>
  );
}
