import React, { ReactNode } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type AlertErrorProps = {
  children?: ReactNode;
  messageError?: string | undefined;
  withIcon?: boolean;
  className?: string;
};

const InputError: React.FC<AlertErrorProps> = ({
  children,
  messageError = undefined,
  withIcon = false,
  className = undefined,
}) => {
  return (
    <div
      role={"alert"}
      className={cn(
        "absolute bottom-0 flex w-full translate-y-[calc(100%_+_2px)] flex-col items-center justify-center gap-x-2 text-xs text-error",
        className ? className : ""
      )}
    >
      {messageError && withIcon ? (
        <ExclamationTriangleIcon className="h-4 w-4" />
      ) : undefined}
      <p>{messageError}</p>
      {children}
    </div>
  );
};

export default InputError;
