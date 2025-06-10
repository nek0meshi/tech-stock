"use client";

import Button from "@/components/buttons/Button";
import FooterActionContainer from "@/components/form/FooterActionContainer";
import Modal from "@/components/modals/Modal";

interface DeleteModalProps {
  target: string;
  isOpen: boolean;
  onConfirm: (result: boolean) => void;
}

export default function DeleteModal({
  target,
  isOpen,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onConfirm(false)}
      title="削除しますか？"
      actions={
        <FooterActionContainer>
          <Button variant="error" size="sm" onClick={() => onConfirm(true)}>
            Delete
          </Button>
          <Button
            variant="secondary"
            size="sm"
            outline
            onClick={() => onConfirm(false)}
          >
            Cancel
          </Button>
        </FooterActionContainer>
      }
    >
      <p>
        本当に<b>{target}</b>を削除しますか？
      </p>
    </Modal>
  );
}
