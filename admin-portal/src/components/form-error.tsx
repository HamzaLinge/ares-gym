import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

type TFormError = {
  message?: string;
  children?: ReactNode;
};

export default function FormError({ message, children }: TFormError) {
  if (!message && !children) return null;
  return (
    <div className="bg-destructive/20 text-destructive flex w-full items-center gap-x-2 rounded-md p-3 text-sm">
      {message && (
        <>
          <ExclamationTriangleIcon className="h-4 w-4" />
          <p>{message}</p>
        </>
      )}
      {children && children}
    </div>
  );
}
