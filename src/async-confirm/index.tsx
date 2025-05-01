import ReactDOM from "react-dom";
import {
  ModalDataRef,
  UseConfirmationModalProps,
  UseModalComponentProps,
} from "../types/asyncConfirm.types";
import { useCallback, useRef } from "react";

export const getRandomPostfix = (): string =>
  Math.random().toString(36).substring(2);

export default async function createModal<TResult, TData>(
  Component: React.FC<UseModalComponentProps<TResult, TData>>,
  promiseRef: React.RefObject<ModalDataRef<TResult> | null>,
  componentData?: TData
) {
  const modalRoot = document.createElement("div");
  if (!promiseRef.current) {
    return;
  }
  const { currentPromisePostfixId: postfixId } = promiseRef.current;

  modalRoot.setAttribute("id", `modal__${postfixId}`);
  modalRoot.setAttribute("role", "dialog");
  modalRoot.setAttribute("aria-modal", "true");
  modalRoot.tabIndex = -1;
  modalRoot.classList.add("useModal__overlay");

  document.body?.append(modalRoot);

  const myContainer = ReactDOM.createPortal(
    <Component
      data={componentData}
      onResolve={(result) => resolveConfirmation(promiseRef, result)}
    />,
    modalRoot,
    postfixId
  );

  const createPortalEvent = new CustomEvent("add-confirm-event", {
    detail: { portal: myContainer, id: postfixId },
  });
  window.dispatchEvent(createPortalEvent);
}

const cleanupContainer = (containerIdPostfix: string) => {
  const body = document.body;
  const modalContainer = getModalContainerById(containerIdPostfix);

  const deletePortalEvents = new CustomEvent("remove-confirm-event", {
    detail: { containerIdPostfix },
  });
  window.dispatchEvent(deletePortalEvents);

  if (!modalContainer || !body) {
    return;
  }

  body.removeChild(modalContainer);
};

const getModalContainerById = (containerIdPostfix: string): HTMLDivElement | null =>
    document.querySelector<HTMLDivElement>(`div#modal__${containerIdPostfix}`);

function resolveConfirmation<TResult>(modalDataRef: React.RefObject<ModalDataRef<TResult> | null>, result: TResult) {
  if (!modalDataRef.current) {
    return;
  }
  cleanupContainer(modalDataRef.current.currentPromisePostfixId);
  modalDataRef.current.resolve(result);
  modalDataRef.current = null;
}

export const useConfirmationModal = <TResult, TData extends (object | undefined)>({
  Component,
}: UseConfirmationModalProps<TResult, TData>) => {

  const promiseRef = useRef<ModalDataRef<TResult> | null>(null);

  return {
    waitConfirmation: useCallback((data?: TData) => {
      return new Promise<TResult>((resolve) => {
        if (promiseRef.current) {
          console.warn("Could not wait for confirmation because there is already another one pending");
          return;
        }
        const containerIdPostfix = getRandomPostfix();
        promiseRef.current = {
          resolve,
          currentPromisePostfixId: containerIdPostfix
        }
        createModal(Component, promiseRef, data);
      });
    }, [Component]),
    forceResolve: (result: TResult) => {
      if (!promiseRef.current) {
        return;
      }

      resolveConfirmation(promiseRef, result);
    }
  }
};
