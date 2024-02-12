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
import {
  CalendarIcon,
  PlusIcon,
  MinusCircledIcon,
  MinusIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import BtnSubmit from "../BtnSubmit";
import {
  TDatePickerFieldProps,
  TFilePickerFieldProps,
  TSelectFieldProps,
  TSelectOption,
  TTextFieldProps,
  TTextareaFieldProps,
} from "./types";

// Helper functions for rendering each field type
export const renderText = ({
  textProps,
}: Pick<TTextFieldProps, "textProps">) => {
  return (
    <div className="w-full">
      <Label htmlFor={textProps.name} className="capitalize">
        {textProps.label
          ? textProps.label
          : textProps.placeholder
          ? textProps.placeholder
          : null}
        {textProps.required && <span className="text-accent-100"> *</span>}
      </Label>
      <Input id={textProps.name} className="bg-white" {...textProps} />
    </div>
  );
};

export const renderTextarea = ({
  textareaProps,
}: Pick<TTextareaFieldProps, "textareaProps">) => {
  return (
    <div className="w-full">
      <Label htmlFor={textareaProps.name} className="capitalize">
        {textareaProps.label
          ? textareaProps.label
          : textareaProps.placeholder
          ? textareaProps.placeholder
          : null}
        {textareaProps.required && <span className="text-accent-100"> *</span>}
      </Label>
      <Textarea
        id={textareaProps.name}
        className="bg-white"
        {...textareaProps}
      />
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

export const renderSelect = ({
  selectProps,
}: Pick<TSelectFieldProps, "selectProps">) => (
  <div className={"w-full"}>
    <Label htmlFor={selectProps.name} className="capitalize">
      {selectProps.label
        ? selectProps.label
        : selectProps.placeholder
        ? selectProps.placeholder
        : null}
      {selectProps.required && <span className="text-accent-100"> *</span>}
    </Label>
    <Select
      name={selectProps.name}
      defaultValue={
        selectProps.defaultValue
          ? (selectProps.defaultValue as string)
          : undefined
      }
    >
      <SelectTrigger id={selectProps.name} className={"w-full bg-white"}>
        <SelectValue
          className={"capitalize"}
          placeholder={selectProps.placeholder || "Select an option"}
        />
      </SelectTrigger>
      <SelectContent className={"capitalize"}>
        {renderOptions(selectProps.options)}
      </SelectContent>
    </Select>
  </div>
);

export const renderDatePicker = ({
  datepickerProps,
}: Pick<TDatePickerFieldProps, "datepickerProps">) => {
  const [date, setDate] = useState<Date>();

  return (
    <div className={"w-full"}>
      <Label htmlFor={datepickerProps.name} className="font-base">
        {datepickerProps.label
          ? datepickerProps.label
          : datepickerProps.placeholder
          ? datepickerProps.placeholder
          : null}
        {datepickerProps.required && (
          <span className="text-accent-100"> *</span>
        )}
      </Label>
      <input
        hidden
        readOnly
        type={"date"}
        value={date ? format(date, "yyyy-MM-dd") : ""}
        name={datepickerProps.name}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={datepickerProps.name}
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

function InputFile({
  index,
  name,
  accept,
  placeholder,
}: {
  index: number;
  name: string;
  accept?: string;
  placeholder?: string;
}) {
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);

  return (
    <Label htmlFor={`filepicker-${index}`}>
      <input
        hidden
        id={`filepicker-${index}`}
        type={"file"}
        name={name}
        accept={accept ? accept : "*"}
        onChange={(e) =>
          setCurrentFile(e.target.files ? e.target.files[0] : undefined)
        }
      />
      {!currentFile ? (
        <p className="w-fit p-1 text-sm font-normal italic shadow">
          {placeholder ? (
            <span className={"capitalize"}>{placeholder}</span>
          ) : (
            "Select File"
          )}
        </p>
      ) : (
        <div className="flex w-full items-center gap-x-2 rounded p-1">
          <img
            alt={currentFile.name}
            src={URL.createObjectURL(currentFile)}
            className="w-12"
          />
          <p className="text-sm italic">
            {`${currentFile.name}, ${returnFileSize(currentFile.size)}.`}
          </p>
        </div>
      )}
    </Label>
  );
}

export const renderFilePicker = ({
  filepickerProps,
}: Pick<TFilePickerFieldProps, "filepickerProps">) => {
  const [nbrInputFile, setNbrInputFile] = useState<number[]>([0]);

  const handleAddInput = () => {
    const copyNbrInputFile = [...nbrInputFile];
    copyNbrInputFile.push(copyNbrInputFile.length);
    setNbrInputFile(copyNbrInputFile);
  };

  const handleRemoveInput = (index: number) => {
    const filteredNbrInputFile = nbrInputFile.filter(
      (_, indexInput) => indexInput !== index
    );
    setNbrInputFile(filteredNbrInputFile);
  };

  return (
    <div className="self-start">
      <Label className={"flex items-center"}>
        {filepickerProps.label ? (
          <span className={"capitalize"}>{filepickerProps.label}</span>
        ) : null}
        {filepickerProps.required && (
          <span className="text-accent-100"> *</span>
        )}
        {nbrInputFile.length < 1 ||
        (nbrInputFile.length >= 1 && filepickerProps.multiple) ? (
          <PlusIcon
            className={
              "w-5 h-5 rounded-full ml-4 bg-slate-300 text-slate-800 hover:bg-slate-800 hover:text-bg-100 p-1"
            }
            onClick={handleAddInput}
          />
        ) : null}
      </Label>

      {nbrInputFile.map((_, index) => (
        <div
          key={`filepicker-${index}`}
          className={"flex items-center gap-x-2"}
        >
          <InputFile
            index={index}
            name={filepickerProps.name}
            accept={filepickerProps.accept}
            placeholder={filepickerProps.placeholder}
          />
          <MinusIcon
            className={
              "w-5 h-5 rounded-full bg-red-300 text-red-800 hover:bg-red-400 hover:text-bg-100 p-1"
            }
            onClick={() => handleRemoveInput(index)}
          />
        </div>
      ))}
    </div>
  );
};

export const renderSubmitButton = () => (
  <BtnSubmit className="w-full max-w-xl self-center" />
);
