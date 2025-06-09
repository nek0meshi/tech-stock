"use client";

import InputLabel from "@/components/form/InputLabel";
import InputRadio from "@/components/form/InputRadio";
import InputRadioLabel from "@/components/form/InputRadioLabel";
import RadioGroup from "@/components/form/RadioGroup";
import Container from "@/components/layout/Container";
import BreadcrumbItem from "@/components/nav/BreadcrumbItem";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import PageTitle from "@/components/typography/PageTitle";
import { CreateRecordDocument, RecordStatus } from "@/generated/client/graphql";
import Link from "next/link";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

const STATUS_OPTIONS = [
  { label: "Unread", value: RecordStatus.Unread },
  { label: "Reading", value: RecordStatus.Reading },
  { label: "Read", value: RecordStatus.Read },
] as const;

type CreateRecordFormData = {
  title: string;
  rating: number;
  status: RecordStatus;
  memo: string;
  tags: string[];
};

export default function NewRecord() {
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
  const [createRecordResult, createRecord] = useMutation(CreateRecordDocument);

  const onSubmit = (data: CreateRecordFormData) => {
    console.log(data);
    createRecord({ input: { ...data, tags: [] } });
  };

  const statusOptions = useMemo(() => {
    return STATUS_OPTIONS.map((option) => ({
      ...option,
      inputProps: register("status"),
    }));
  }, [register]);

  console.log({
    statusOptions,
  });

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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <InputLabel label="Title">
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("title")}
          />
        </InputLabel>
        <InputLabel label="Rating">
          <input
            type="number"
            className="input input-bordered w-[100px]"
            {...register("rating", { valueAsNumber: true })}
          />
        </InputLabel>
        <InputLabel label="Status">
          <RadioGroup>
            {statusOptions.map((option) => (
              <InputRadioLabel key={option.value} label={option.label}>
                <InputRadio value={option.value} {...option.inputProps} />
              </InputRadioLabel>
            ))}
          </RadioGroup>
        </InputLabel>
        <InputLabel label="Memo">
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("memo")}
          />
        </InputLabel>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link href="/records" className="btn btn-outline">
          Cancel
        </Link>
      </form>
    </Container>
  );
}
