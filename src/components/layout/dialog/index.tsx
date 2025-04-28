import { DialogPanel, Dialog as HDLDialog } from "@headlessui/react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function Dialog({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  function close() {
    setIsOpen(false);
  }

  return (
    <HDLDialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className="w-full max-w-md rounded-xl bg-[#1e1e1e] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            transition
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </HDLDialog>
  );
}
