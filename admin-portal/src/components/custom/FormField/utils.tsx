import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { returnFileSize } from "@/utils/helpers";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import {
  TDatePickerFieldProps,
  TFilePickerFieldProps,
  TTextFieldProps,
  TSelectFieldProps,
  TSelectOption,
  TTextareaFieldProps,
} from "./types";
import BtnSubmit from "../BtnSubmit";

// Helper functions for rendering each field type
export const renderText = (props: TTextFieldProps) => {
  const { typeField, messageError, ...textProps } = props;
  return (
    <div className="w-full">
      <Label htmlFor={props.name} className="capitalize">
        {props.placeholder}
        {props.required && <span className="text-accent-100"> *</span>}
      </Label>
      <Input id={props.name} className="bg-white" {...textProps} />
    </div>
  );
};

export const renderTextarea = (props: TTextareaFieldProps) => {
  const { typeField, messageError, ...textareaProps } = props;
  return (
    <div className="w-full">
      <Label htmlFor={props.name} className="capitalize">
        {props.placeholder}
        {props.required && <span className="text-accent-100"> *</span>}
      </Label>
      <Textarea id={props.name} className="bg-white" {...textareaProps} />
    </div>
  );
};

const renderOptions = (options: TSelectOption[]): React.ReactNode => {
  return options.map((option) => {
    if (option.children && option.children.length > 0) {
      return (
        <SelectGroup key={option.value}>
          <SelectLabel>{option.label}</SelectLabel>
          <SelectGroup className={"ml-2 border-l"}>
            {renderOptions(option.children)}
          </SelectGroup>
        </SelectGroup>
      );
    } else {
      return (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      );
    }
  });
};

export const renderSelect = (props: TSelectFieldProps) => (
  <div className={"w-full"}>
    <Label htmlFor={props.name} className="capitalize">
      {props.placeholder}
      {props.required && <span className="text-accent-100"> *</span>}
    </Label>
    <Select
      name={props.name}
      defaultValue={props.defaultValue ? props.defaultValue : ""}
    >
      <SelectTrigger id={props.name} className={"w-full bg-white"}>
        <SelectValue
          className={"capitalize"}
          placeholder={props.placeholder || "Select an option"}
        />
      </SelectTrigger>
      <SelectContent className={"capitalize"}>
        {renderOptions(props.options)}
      </SelectContent>
    </Select>
  </div>
);

export const renderDatePicker = (props: TDatePickerFieldProps) => {
  const { typeField, messageError, ...datepickerProps } = props;
  const [date, setDate] = useState<Date>();

  return (
    <div className={"w-full"}>
      <Label htmlFor={props.name} className="font-base">
        {props.placeholder}
        {props.required && <span className="text-accent-100"> *</span>}
      </Label>
      <input
        hidden
        readOnly
        type={"date"}
        value={date ? format(date, "yyyy-MM-dd") : ""}
        {...datepickerProps}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={props.name}
            variant={"outline"}
            className={"w-full justify-start"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span>{datepickerProps.placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const renderFilePicker = (props: TFilePickerFieldProps) => {
  const [currrentFiles, setCurrentFiles] = useState<File[]>([]);
  return (
    <div className="self-start">
      <Label htmlFor="filepicker" className="capitalize">
        {props.placeholder}
        {props.required && <span className="text-accent-100"> *</span>}
      </Label>
      <input
        hidden
        id="filepicker"
        type="file"
        name={props.multiple ? "files" : "file"}
        multiple={props.multiple ? props.multiple : false}
        accept={props.accept ? props.accept : "*"}
        onChange={(e) => setCurrentFiles(Array.from(e.target.files || []))}
      />
      <Label htmlFor="filepicker">
        {currrentFiles.length > 0 ? (
          <ul>
            {currrentFiles.map((file, index) => (
              <li
                key={file.name}
                className="flex w-full items-center gap-x-2 rounded p-1"
              >
                <img
                  alt={file.name}
                  src={URL.createObjectURL(file)}
                  className="w-12"
                />
                <p className="text-sm italic">
                  {`${file.name}, ${returnFileSize(file.size)}.`}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="w-fit p-1 text-sm font-normal italic shadow">
            {props.noSelectionText}
          </p>
        )}
      </Label>
    </div>
  );
};

export const renderSubmitButton = () => (
  <BtnSubmit className="w-full max-w-xl self-center" />
);
