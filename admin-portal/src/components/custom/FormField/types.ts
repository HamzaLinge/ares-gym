type TErrorProps = {
  messageError?: string | undefined;
};

export type TCommonProps = {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  defaultValue?: string | string[] | number | undefined;
};

export type TTextFieldProps = {
  typeField: "text";
  textProps: TCommonProps;
} & TErrorProps;

export type TTextareaFieldProps = {
  typeField: "textarea";
  textareaProps: TCommonProps;
} & TErrorProps;

export type TSelectOption = {
  value: string;
  label: string;
  children?: TSelectOption[];
};
export type TSelectFieldProps = {
  typeField: "select";
  selectProps: {
    options: TSelectOption[];
  } & TCommonProps;
} & TErrorProps;

export type TDatePickerFieldProps = {
  typeField: "datepicker";
  datepickerProps: TCommonProps;
} & TErrorProps;

export type TFilePickerFieldProps = {
  typeField: "filepicker";
  filepickerProps: {
    multiple?: boolean;
    accept?: string;
  } & TCommonProps;
} & TErrorProps;

export type TSubmitButtonProps = {
  typeField: "submit";
} & TErrorProps;

export type TFormFieldProps =
  | TTextFieldProps
  | TTextareaFieldProps
  | TSelectFieldProps
  | TDatePickerFieldProps
  | TFilePickerFieldProps
  | TSubmitButtonProps;
