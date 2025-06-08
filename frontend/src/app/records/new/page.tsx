"use client";

import InputLabel from "@/components/form/InputLabel";
import InputRadio from "@/components/form/InputRadio";
import InputRadioLabel from "@/components/form/InputRadioLabel";
import RadioGroup from "@/components/form/RadioGroup";
import Container from "@/components/layout/Container";
import PageTitle from "@/components/typography/PageTitle";
import { RecordStatus } from "@/generated/graphql";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const STATUS_OPTIONS = [
  { label: "Unread", value: RecordStatus.Unread },
  { label: "Reading", value: RecordStatus.Reading },
  { label: "Read", value: RecordStatus.Read },
] as const;

export default function NewRecord() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      rating: 5,
      status: RecordStatus.Reading,
      memo: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
      <PageTitle>New Record</PageTitle>
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
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </Container>
  );
}
