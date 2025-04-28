import { OpenToggle } from "../../types/openToggle";
import Dialog from "../layout/dialog";

export function GameObjectReferenceDialog(toggleProps: OpenToggle) {
    return (
        <Dialog {...toggleProps}>
            <div className="w-full max-w-md rounded-xl bg-[#1e1e1e] p-6">
                <h2>Game Object Reference</h2>
            </div>
        </Dialog>
    );
}
