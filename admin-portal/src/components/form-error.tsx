import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type TFormError = {
  message?: string;
};

export default function FormError({ message }: TFormError) {
  if (!message) return null;
  return (
    <div className="bg-destructive/20 text-destructive flex w-full items-center gap-x-2 rounded-md p-3 text-sm">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message} </p>
    </div>
  );
}
