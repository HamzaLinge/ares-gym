import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type AlertErrorProps = {
  messageError: string | undefined;
  withIcon?: boolean;
  className?: string;
};

const AlertError: React.FC<AlertErrorProps> = ({
  messageError = undefined,
  withIcon = false,
  className = undefined,
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-x-2 text-xs text-error",
        className
      )}
    >
      {messageError && withIcon ? (
        <ExclamationTriangleIcon className="h-4 w-4" />
      ) : (
        ""
      )}
      <span>{messageError}</span>
    </div>
  );
};

export default AlertError;
