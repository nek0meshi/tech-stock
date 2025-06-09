import { useState } from "react";

const useConfirmModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  // Modalを開き、ユーザーの選択結果をPromiseとして返す関数
  const confirm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
      setOpen(true);
    });
  };

  const handleConfirm = (result: boolean) => {
    setOpen(false);
    if (resolvePromise) {
      resolvePromise(result);
      setResolvePromise(null);
    }
  };

  return {
    open,
    confirm,
    handleConfirm,
  };
};

export default useConfirmModal;
