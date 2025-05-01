import { ModalDialog } from "../modal-dialog";

interface Props {
  title: string;
  onConfirm: () => void;
  onDeny: () => void;

  confirmText?: string;
  denyText?: string;
}

export function ConfirmDialog({ title, onConfirm, onDeny, confirmText, denyText }: Props) {
  return (
    <ModalDialog isOpen setIsOpen={onDeny}>
      <div className="rounded-xl bg-[#1e1e1e] p-6 ">
        <h1>{title}</h1>
        <div className="flex w-full gap-x-2">
          <button
            type="button"
            className="p-2 py-1 bg-green-500 rounded-sm cursor-pointer"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button type="button" className="p-2 py-1 bg-red-500 rounded-sm cursor-pointer" onClick={onDeny}>
            {denyText}
          </button>
        </div>
      </div>
    </ModalDialog>
  );
}
