import { UseModalComponentProps } from "../../types/asyncConfirm.types";
import { ConfirmDialog } from "../layout/confim-dialog";

export function EngineProjectFolderConfirmDialog({
  onResolve,
  data,
}: UseModalComponentProps<boolean, { handleName: string }>) {
  return (
    <ConfirmDialog
        onConfirm={() => onResolve(true)}
        onDeny={() => onResolve(false)}
        title={`Permitir acesso á ${data?.handleName}?`}
        confirmText="Permitir"
        denyText="Recusar"
    />
  );
}
