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
      title={<h2 className="py-3">Allow access to the <span className="text-blue-500">{data?.handleName}</span> folder?</h2>}
      confirmText="Allow"
      denyText="Deny"
      content={<p>Allow read access to the folder ir order to interact with the files</p>}
    />
  );
}
