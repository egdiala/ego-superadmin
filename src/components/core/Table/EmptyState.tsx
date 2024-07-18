import React from "react";

export const EmptyState: React.FC<{ emptyStateText?: string | null }> = ({ emptyStateText = null }) => {
  return (
    <div className="min-h-[29rem] flex items-center flex-col justify-center">
      <p className="max-w-[25rem] text-base text-neutral-base text-center">
        { emptyStateText ?? "Uh oh! It seems the desk is a little lonely. Time to  bring some life into this corner of the universe!" }
      </p>
    </div>
  );
};