import CloseButton from "@/components/buttons/CloseButton";
import uuid from "@/utils/uuid";
import Combobox from "./Combobox";

export type Tag = {
  id: string;
  name: string;
};

type TagListInputProps = {
  tags: Tag[];
  selectedTags: Tag[];
  inputText: string;
  setInputText: (text: string) => void;
  onChange: (tags: Tag[]) => void;
};

export default function TagListInput({
  tags,
  selectedTags,
  inputText,
  setInputText,
  onChange,
}: TagListInputProps) {
  const handleAddTag = (input: string) => {
    const newTag = input.trim();

    if (tags.some((tag) => tag.name === newTag) || newTag === "") {
      return;
    }

    const newTags = [...selectedTags, { id: uuid(), name: newTag }];
    onChange(newTags);
  };

  const handleRemoveTag = (id: string) => {
    onChange(selectedTags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      <Combobox
        value={inputText}
        onChange={setInputText}
        placeholder="Search tags"
        options={tags.map((tag) => tag.name)}
        className="w-full"
        onEnter={(input) => {
          handleAddTag(input);
          setInputText("");
        }}
      />
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <div
            key={tag.id}
            className="badge badge-sm badge-outline flex justify-between items-center gap-2 pr-0"
          >
            {tag.name}
            <CloseButton size="xs" onClick={() => handleRemoveTag(tag.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
