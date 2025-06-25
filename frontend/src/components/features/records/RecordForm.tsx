import Button from "@/components/buttons/Button";
import Combobox from "@/components/form/Combobox";
import FooterActionContainer from "@/components/form/FooterActionContainer";
import InputLabel from "@/components/form/InputLabel";
import InputRadio from "@/components/form/InputRadio";
import InputRadioLabel from "@/components/form/InputRadioLabel";
import RadioGroup from "@/components/form/RadioGroup";
import TagListInput from "@/components/form/TagListInput";
import TagListInputController from "@/components/form/TagListInputController";
import { RecordStatus, type Tag } from "@/generated/client/graphql";
import type { RecordFormData } from "@/schema/record";
import { type FormEventHandler, useMemo, useState } from "react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

interface RecordFormProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleCancel: () => void;
  handleGetArticleInfo: () => void;
  disabledGetArticleInfo: boolean;
  register: UseFormRegister<RecordFormData>;
  errors: FieldErrors<RecordFormData>;
  imageUrl: string;
  tags: Tag[];
  control: Control<RecordFormData>;
}

const STATUS_OPTIONS = [
  { label: "Unread", value: RecordStatus.Unread },
  { label: "Reading", value: RecordStatus.Reading },
  { label: "Read", value: RecordStatus.Read },
] as const;

export default function RecordForm({
  handleSubmit,
  handleCancel,
  handleGetArticleInfo,
  disabledGetArticleInfo,
  register,
  errors,
  imageUrl,
  tags,
  control,
}: RecordFormProps) {
  console.log({ errors });

  const statusOptions = useMemo(() => {
    return STATUS_OPTIONS.map((option) => ({
      ...option,
      inputProps: register("status"),
    }));
  }, [register]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputLabel label="URL" error={errors.url?.message}>
        <div className="flex gap-2 w-full">
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("url")}
          />
          <Button
            type="button"
            variant="secondary"
            size="md"
            disabled={disabledGetArticleInfo}
            onClick={handleGetArticleInfo}
          >
            Get Article Info
          </Button>
        </div>
      </InputLabel>
      <InputLabel label="Title" error={errors.title?.message}>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("title")}
        />
      </InputLabel>
      {imageUrl && (
        <div className="flex justify-center">
          <img src={imageUrl} alt="article" className="max-h-[200px]" />
        </div>
      )}
      <InputLabel label="Rating" error={errors.rating?.message}>
        <input
          type="number"
          className="input input-bordered w-[100px]"
          {...register("rating", { valueAsNumber: true })}
        />
      </InputLabel>
      <InputLabel label="Status" error={errors.status?.message}>
        <RadioGroup>
          {statusOptions.map((option) => (
            <InputRadioLabel key={option.value} label={option.label}>
              <InputRadio value={option.value} {...option.inputProps} />
            </InputRadioLabel>
          ))}
        </RadioGroup>
      </InputLabel>
      <InputLabel
        label="Tags"
        // error={errors.tagIds?.message ?? ""}
      >
        {/* <TagListInput
            tags={tags}
            selectedTags={selectedTags}
            inputText={inputTag}
            setInputText={setInputTag}
            onChange={setSelectedTags}
          /> */}
        <TagListInputController
          tags={tags}
          // name="tags"
          control={control}
          {...register("tags")}
        />
      </InputLabel>
      <InputLabel label="Memo" error={errors.memo?.message}>
        <textarea
          className="textarea textarea-bordered w-full"
          {...register("memo")}
        />
      </InputLabel>
      <FooterActionContainer>
        <Button type="submit" variant="primary" size="md">
          Submit
        </Button>
        <Button
          type="button"
          variant="secondary"
          outline
          size="md"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </FooterActionContainer>
    </form>
  );
}
