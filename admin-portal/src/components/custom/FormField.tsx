import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/FormError";

// Define types for the specific props of each input type
type InputProps = {
  typeField: "input";
  defaultValue?: string;
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

type SelectProps = {
  typeField: "select";
  defaultValue?: string;
  options: { value: string; label: string }[];
};

type TextareaProps = {
  typeField: "textarea";
  defaultValue?: string;
};

type ButtonProps = {
  typeField: "submit";
  label: string;
};

type FormErrorProps = {
  messageError?: string;
};

// Union type for all possible props
type TFormFieldProps = (
  | InputProps
  | SelectProps
  | TextareaProps
  | ButtonProps
) &
  FormErrorProps & {
    name: string;
    placeholder?: string;
    className?: string;
  };

export default function FormField(props: TFormFieldProps) {
  const { typeField, name, placeholder, messageError, className } = props;

  const renderInput = () => (
    <Input {...props} className={`text-text-100 ${className}`} />
  );

  // const renderSelect = () => (
  //   <Select name={name} defaultValue={props.defaultValue} className={className}>
  //     {/* Assuming rendering logic for options goes here */}
  //     {props.options.map((option) => (
  //       <option key={option.value} value={option.value}>
  //         {option.label}
  //       </option>
  //     ))}
  //   </Select>
  // );

  const renderTextarea = () => (
    <Textarea
      name={name}
      placeholder={placeholder}
      defaultValue={props.defaultValue}
      className={`text-text-100 ${className}`}
    />
  );

  const renderButton = () => <Button variant="primary">{props.label}</Button>;

  const renderField = () => {
    switch (typeField) {
      case "input":
        return renderInput();
      // case "select":
      //   return renderSelect();
      case "textarea":
        return renderTextarea();
      case "button":
        return renderButton();
      default:
        return null;
    }
  };

  return (
    <div className={`relative grid w-full gap-y-1.5 ${className}`}>
      {renderField()}
      {typeField !== "button" && (
        <FormError
          messageError={messageError}
          className="absolute bottom-0 translate-y-[calc(100%_+_2px)]"
        />
      )}
    </div>
  );
}
