import React, { ReactNode } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type FormErrorProps = {
  children?: ReactNode;
  messageError?: string | undefined;
  withIcon?: boolean;
  className?: string;
};

const FormError: React.FC<FormErrorProps> = ({
  children,
  messageError = undefined,
  withIcon = false,
  className = undefined,
}) => {
  return (
    <div
      role={"alert"}
      className={cn(
        "flex w-full items-center justify-center text-xs text-error",
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

export default FormError;
