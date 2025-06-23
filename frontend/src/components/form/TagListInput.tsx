import CloseButton from "@/components/buttons/CloseButton";
import type { Tag } from "@/schema/tag";

export default function TagListInput({
  tags,
  onRemoveTag,
}: { tags: Tag[]; onRemoveTag: (id: string) => void }) {
  const handleRemoveTag = (id: string) => {
    onRemoveTag(id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="badge badge-sm badge-outline flex justify-between items-center gap-2 pr-0"
        >
          {tag.name}
          <CloseButton size="xs" onClick={() => handleRemoveTag(tag.id)} />
        </div>
      ))}
    </div>
  );
}
