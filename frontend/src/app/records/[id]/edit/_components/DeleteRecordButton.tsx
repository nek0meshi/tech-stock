"use client";

import useToast from "@/client/hooks/useToast";
import Button from "@/components/buttons/Button";
import useConfirmModal from "@/components/modals/ConfirmModal/useConfirmModal";
import DeleteModal from "@/components/modals/DeleteModal";
import { DeleteRecordDocument } from "@/generated/client/graphql";
import { useMutation } from "urql";

interface DeleteRecordButtonProps {
  record: { id: string; title: string };
  onComplete: () => void;
}

export default function DeleteRecordButton({
  record,
  onComplete,
}: DeleteRecordButtonProps) {
  const toast = useToast();
  const confirmModal = useConfirmModal();
  const deleteRecord = useMutation(DeleteRecordDocument)[1];

  const handleDelete = async () => {
    const confirmResult = await confirmModal.confirm();

    if (!confirmResult) {
      return;
    }

    const result = await deleteRecord({ id: record.id });

    if (result.error) {
      console.error(result.error);
      toast.error("Failed to delete record");

      return;
    }

    toast.success("Record deleted successfully");

    onComplete();
  };

  return (
    <>
      <Button variant="error" size="sm" outline onClick={handleDelete}>
        Delete
      </Button>
      {confirmModal.open && (
        <DeleteModal
          target={record.title}
          isOpen={confirmModal.open}
          onConfirm={confirmModal.handleConfirm}
        />
      )}
    </>
  );
}
