import { InputProps } from "@/components/ui/input";
import { TextareaProps } from "@/components/ui/textarea";

export type TBaseProps = {
  name: string;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
  messageError?: string;
};

export type TInputFieldProps = { typeField: "input" } & TBaseProps &
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

export type TSubmitButtomProps = { typeField: "submit" } & Pick<
  TBaseProps,
  "messageError" | "className"
>;

export type TFormFieldProps =
  | TInputFieldProps
  | TTextareaFieldProps
  | TSelectFieldProps
  | TDatePickerFieldProps
  | TFilePickerFieldProps
  | TSubmitButtomProps;
