"use client";

import useToast from "@/client/hooks/useToast";
import RecordForm from "@/components/features/records/RecordForm";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import BreadcrumbItem from "@/components/nav/BreadcrumbItem";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import {
  CreateRecordDocument,
  GetArticleInfoDocument,
  RecordStatus,
} from "@/generated/client/graphql";
import { type RecordFormData, RecordSchema } from "@/schema/record";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";

export default function NewRecord() {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<RecordFormData>({
    defaultValues: {
      title: "",
      rating: 5,
      status: RecordStatus.Reading,
      memo: "",
      url: "",
      // description: "",
      imageUrl: "",
      // tags: [],
    },
    resolver: zodResolver(RecordSchema),
  });
  const url = watch("url");
  const [resultArticleInfo, fetchArticleInfo] = useQuery({
    query: GetArticleInfoDocument,
    variables: {
      url,
    },
    pause: true,
  });

  const [_, createRecord] = useMutation(CreateRecordDocument);

  const onSubmit = async (input: RecordFormData) => {
    const result = await createRecord({
      input,
    });

    if (result.error) {
      console.error(result.error);
      toast.error("Failed to create record");

      return;
    }

    toast.success("Record created successfully");

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
      setValue("imageUrl", resultArticleInfo.data.articleInfo.imageUrl);
    }
  }, [resultArticleInfo.data, setValue]);

  return (
    <Container className="p-4 flex flex-col gap-4">
      <PageHeader
        title="New Record"
        breadcrumbItems={
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/records">Records</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>New Record</BreadcrumbItem>
          </Breadcrumbs>
        }
      />
      <RecordForm
        handleSubmit={handleSubmit(onSubmit)}
        handleCancel={() => router.back()}
        handleGetArticleInfo={handleGetArticleInfo}
        disabledGetArticleInfo={!url}
        register={register}
        errors={errors}
      />
    </Container>
  );
}
