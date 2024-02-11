import { InputProps } from "@/components/ui/input";
import { TextareaProps } from "@/components/ui/textarea";

export type TBaseProps = {
  name: string;
  placeholder: string;
  required?: boolean;
  defaultValue?: string | number | undefined | null;
  className?: string;
  messageError?: string | undefined;
};

export type TTextFieldProps = { typeField: "text" } & TBaseProps &
  Omit<InputProps, "name" | "placeholder" | "defaultValue">;

export type TTextareaFieldProps = { typeField: "textarea" } & TBaseProps &
  Omit<TextareaProps, "name" | "placeholder" | "defaultValue">;

export type TSelectOption = {
  value: string;
  label: string;
  children?: TSelectOption[];
};
export type TSelectFieldProps = { typeField: "select" } & TBaseProps & {
    options: TSelectOption[];
  };

export type TDatePickerFieldProps = { typeField: "datepicker" } & TBaseProps;

export type TFilePickerFieldProps = { typeField: "filepicker" } & Omit<
  TBaseProps,
  "name"
> & {
    multiple?: boolean;
    accept?: string;
    noSelectionText?: string;
  };

export type TSubmitButtonProps = { typeField: "submit" } & Pick<
  TBaseProps,
  "messageError" | "className"
>;

export type TFormFieldProps =
  | TTextFieldProps
  | TTextareaFieldProps
  | TSelectFieldProps
  | TDatePickerFieldProps
  | TFilePickerFieldProps
  | TSubmitButtonProps;
