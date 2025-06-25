import { useState } from "react";
import { Control, useController } from "react-hook-form";
import TagListInput, { type Tag } from "./TagListInput";

export default function TagListInputController<NAME extends string>({
  tags,
  name,
  control,
  ...props
}: {
  tags: Tag[];
  name: NAME;
  control: Control<any>;
}) {
  console.log({props})
  const { field } = useController({ name, control, ...props });

  const [inputText, setInputText] = useState("");

  return (
    <TagListInput
      tags={tags}
      selectedTags={field.value}
      inputText={inputText}
      setInputText={setInputText}
      onChange={field.onChange}
    />
  );
}
