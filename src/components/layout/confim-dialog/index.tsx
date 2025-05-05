import { ReactNode } from "react";
import { ModalDialog } from "../modal-dialog";

interface Props {
  title: ReactNode;
  onConfirm: () => void;
  onDeny: () => void;

  confirmText?: string;
  denyText?: string;

  content?: ReactNode;
}

export function ConfirmDialog({ title, onConfirm, onDeny, confirmText, denyText, content }: Props) {
  return (
    <ModalDialog isOpen setIsOpen={onDeny}>
      <div className="rounded-xl bg-[#1e1e1e] px-6">
        {title}
        <div>{content}</div>
        <div className="flex w-full gap-x-3 justify-center py-3">
          <button
            type="button"
            className="p-2 py-1 bg-blue-600 hover:bg-blue-800 rounded-lg cursor-pointer"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button type="button" className="p-2 py-1 cursor-pointer focus:outline-none rounded-lg border border-gray-200 hover:text-red-400 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={onDeny}>
            {denyText}
          </button>
        </div>
      </div>
    </ModalDialog>
  );
}
