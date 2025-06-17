"use client";

import useToast from "@/client/hooks/useToast";
import RecordForm from "@/components/features/records/RecordForm";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import BreadcrumbItem from "@/components/nav/BreadcrumbItem";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import {
  GetArticleInfoDocument,
  UpdateRecordDocument,
} from "@/generated/client/graphql";
import {
  type Record,
  type RecordFormData,
  RecordFormSchema,
} from "@/schema/record";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import DeleteRecordButton from "./DeleteRecordButton";

interface EditRecordContentProps {
  record: Record;
}

export default function EditRecordContent({ record }: EditRecordContentProps) {
  console.log({ record });

  const router = useRouter();
  const toast = useToast();
  const updateRecord = useMutation(UpdateRecordDocument)[1];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<RecordFormData>({
    defaultValues: {
      title: record.title,
      rating: record.rating,
      status: record.status,
      memo: record.memo,
      url: record.url,
    },
    resolver: zodResolver(RecordFormSchema),
  });
  const url = watch("url");
  const [resultArticleInfo, fetchArticleInfo] = useQuery({
    query: GetArticleInfoDocument,
    variables: {
      url,
    },
    pause: true,
  });

  const onSubmit = async (input: RecordFormData) => {
    const result = await updateRecord({
      id: record.id,
      input: {
        title: input.title,
        rating: input.rating,
        status: input.status,
        memo: input.memo,
        url: input.url,
      },
    });

    if (result.error) {
      console.error(result.error);
      toast.error("Failed to update record");

      return;
    }

    toast.success("Record updated successfully");

    router.push("/records");
  };

  const handleGetArticleInfo = async () => {
    const url = getValues("url");
    if (!url) {
      return;
    }

    fetchArticleInfo();
  };

  useEffect(() => {
    if (resultArticleInfo.data?.articleInfo) {
      setValue("title", resultArticleInfo.data.articleInfo.title);
      // setValue("description", resultArticleInfo.data.articleInfo.description);
      // setValue("imageUrl", resultArticleInfo.data.articleInfo.imageUrl);
    }
  }, [resultArticleInfo.data, setValue]);

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
          <DeleteRecordButton
            record={record}
            onComplete={() => router.back()}
          />
        }
      />
      <RecordForm
        handleSubmit={handleSubmit(onSubmit)}
        handleCancel={() => router.back()}
        handleGetArticleInfo={handleGetArticleInfo}
        disabledGetArticleInfo={!url}
        register={register}
        errors={errors}
        imageUrl={record.imageUrl ?? ""}
      />
    </Container>
  );
}
