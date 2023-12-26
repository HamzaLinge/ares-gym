import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type AlertErrorProps = {
  messageError: string | undefined;
  withIcon?: boolean;
};

const AlertError: React.FC<AlertErrorProps> = ({
  messageError = undefined,
  withIcon = false,
}) => {
  if (!messageError) return null;

  return (
    <div className="flex w-full items-center justify-center gap-x-2 text-xs text-error">
      {withIcon ? <ExclamationTriangleIcon className="h-4 w-4" /> : ""}
      <span>{messageError}</span>
    </div>
  );
};

export default AlertError;
