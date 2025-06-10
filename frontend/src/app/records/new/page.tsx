"use client";

import RecordForm from "@/components/features/records/RecordForm";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import BreadcrumbItem from "@/components/nav/BreadcrumbItem";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import {
  CreateRecordDocument,
  RecordStatus,
  type Tag,
} from "@/generated/client/graphql";
import { type RecordFormData, RecordSchema } from "@/schema/record";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

export default function NewRecord() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordFormData>({
    defaultValues: {
      title: "",
      rating: 5,
      status: RecordStatus.Reading,
      memo: "",
      // tags: [],
    },
    resolver: zodResolver(RecordSchema),
  });
  const [_, createRecord] = useMutation(CreateRecordDocument);

  console.log({ errors });

  const onSubmit = async (data: RecordFormData) => {
    console.log(data);
    const result = await createRecord({
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
        register={register}
        errors={errors}
      />
    </Container>
  );
}
