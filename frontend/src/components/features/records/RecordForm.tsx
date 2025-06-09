import InputLabel from "@/components/form/InputLabel";
import InputRadio from "@/components/form/InputRadio";
import InputRadioLabel from "@/components/form/InputRadioLabel";
import RadioGroup from "@/components/form/RadioGroup";
import { RecordStatus, type Tag } from "@/generated/client/graphql";
import { type FormEventHandler, useMemo } from "react";
import type { UseFormRegister } from "react-hook-form";

interface RecordFormData {
  title: string;
  rating: number;
  status: RecordStatus;
  memo: string;
  tags: Tag[];
}

interface RecordFormProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleCancel: () => void;
  register: UseFormRegister<RecordFormData>;
}

const STATUS_OPTIONS = [
  { label: "Unread", value: RecordStatus.Unread },
  { label: "Reading", value: RecordStatus.Reading },
  { label: "Read", value: RecordStatus.Read },
] as const;

export default function RecordForm({
  handleSubmit,
  handleCancel,
  register,
}: RecordFormProps) {
  const statusOptions = useMemo(() => {
    return STATUS_OPTIONS.map((option) => ({
      ...option,
      inputProps: register("status"),
    }));
  }, [register]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
      <button type="button" className="btn btn-outline" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
