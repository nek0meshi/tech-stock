"use client";

import RecordForm from "@/components/features/records/RecordForm";
import Container from "@/components/layout/Container";
import BreadcrumbItem from "@/components/nav/BreadcrumbItem";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import PageTitle from "@/components/typography/PageTitle";
import {
  CreateRecordDocument,
  RecordStatus,
  type Tag,
} from "@/generated/client/graphql";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

type CreateRecordFormData = {
  title: string;
  rating: number;
  status: RecordStatus;
  memo: string;
  tags: Tag[];
};

export default function NewRecord() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRecordFormData>({
    defaultValues: {
      title: "",
      rating: 5,
      status: RecordStatus.Reading,
      memo: "",
      tags: [],
    },
  });
  const [_, createRecord] = useMutation(CreateRecordDocument);

  const onSubmit = (data: CreateRecordFormData) => {
    console.log(data);
    createRecord({ input: { ...data, tags: [] } });
  };

  return (
    <Container className="p-4 flex flex-col gap-4">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link href="/records">Records</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>New Record</BreadcrumbItem>
        </Breadcrumbs>
        <PageTitle>New Record</PageTitle>
      </div>
      <RecordForm
        handleSubmit={handleSubmit(onSubmit)}
        handleCancel={() => router.back()}
        register={register}
      />
    </Container>
  );
}
