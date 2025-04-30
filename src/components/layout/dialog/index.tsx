import { DialogPanel, Dialog as HDLDialog } from "@headlessui/react";
import { ReactNode } from "react";
import { OpenToggle } from "../../../types/openToggle";

interface Props {
  children: ReactNode;
}

export default function Dialog({ children, isOpen, setIsOpen }: Props & OpenToggle) {
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <HDLDialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="backdrop-blur-sm flex min-h-full bg-blue-600/20 items-center justify-center">
          <DialogPanel
            className="duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            transition
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </HDLDialog>
  );
}
