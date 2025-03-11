import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { TableAction } from "@/components/core";

interface ExportButtonProps {
    // eslint-disable-next-line no-unused-vars
    onExport: any;
    onExported: any;
    isLoading: boolean;
    theme?: "ghost" | "primary" | "secondary" | "tertiary" | "grey"
}

export const ExportButton: React.FC<ExportButtonProps> = ({ isLoading, onExport, onExported, theme = "ghost" }) => {
    useEffect(() => {
        if (!isLoading) {
            onExported();
        }
    }, [isLoading, onExported]);
    return (
        <TableAction type="button" theme={theme} block onClick={onExport} disabled={isLoading}>
            <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
            Export
        </TableAction>
    );
};
