import { useEffect, useState } from "react";
import { AddConfirmEventData, RemoveConfirmEventData } from "../../types/asyncConfirm.types";

const AsyncConfirmRoot = () => {

    const [confirmPortalList, setConfirmPortalList] = useState<AddConfirmEventData[]>([]);

    useEffect(() => {

        const handleAddConfirmContainer = (e: CustomEvent<AddConfirmEventData>) => {
            const portal = e.detail;
            setConfirmPortalList(prev => [...prev, portal]);
        };

        const handleRemoveConfirmContainer = (e: CustomEvent<RemoveConfirmEventData>) => {
            const portalId = e.detail.containerIdPostfix;
            setConfirmPortalList(prev => {
                const indexToRemove = prev.findIndex(c => c.id === portalId);
                if (indexToRemove === -1) {
                    console.error(`Failed to remove confirm container, portalId ${portalId} not found on list:`, prev);
                    return prev;
                }
                const newPortalList = prev.slice();
                newPortalList.splice(indexToRemove, 1);
                return newPortalList;
            });
        };

        window.addEventListener("add-confirm-event", handleAddConfirmContainer);
        window.addEventListener("remove-confirm-event", handleRemoveConfirmContainer);
        return () => {
            window.removeEventListener("add-confirm-event", handleAddConfirmContainer);
            window.removeEventListener("remove-confirm-event", handleRemoveConfirmContainer);
        };
    }, []);

    const rawPortalList = confirmPortalList.map(c => c.portal);

    return (
        <>
            {rawPortalList}
        </>
    );
};

export default AsyncConfirmRoot;
