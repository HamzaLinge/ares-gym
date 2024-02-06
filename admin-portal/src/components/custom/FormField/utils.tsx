import {
  SelectGroup,
  SelectLabel,
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TSelectOption,
  TInputFieldProps,
  TTextareaFieldProps,
  TSelectFieldProps,
  TFormFieldProps,
  TDatePickerFieldProps,
} from "./types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { log } from "console";

// Helper functions for rendering each field type

const excludeUnwantedProps = (props: TFormFieldProps) => {
  const { typeField, messageError, ...fieldProps } = props;
  return fieldProps;
};

export const renderInput = (props: TInputFieldProps) => {
  const { typeField, messageError, ...inputProps } = props;
  return <Input {...inputProps} />;
};

export const renderTextarea = (props: TTextareaFieldProps) => {
  const { typeField, messageError, ...textareaProps } = props;
  return <Textarea {...textareaProps} />;
};

const renderOptions = (options: TSelectOption[]): React.ReactNode => {
  return options.map((option) => {
    if (option.children && option.children.length > 0) {
      return (
        <SelectGroup key={option.value}>
          <SelectLabel>{option.label}</SelectLabel>
          {renderOptions(option.children)}
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
  <Select name={props.name} defaultValue={props.defaultValue}>
    <SelectTrigger className={"w-full"}>
      <SelectValue
        className={"capitalize"}
        placeholder={props.placeholder || "Select an option"}
      />
    </SelectTrigger>
    <SelectContent className={"capitalize"}>
      {renderOptions(props.options)}
    </SelectContent>
  </Select>
);

export const renderDatePicker = (props: TDatePickerFieldProps) => {
  const { typeField, messageError, ...datepickerProps } = props;
  const [date, setDate] = useState<Date>();
  // console.log(date);

  return (
    <>
      <Input
        type={"date"}
        defaultValue={String(date)}
        name={props.name}
        className={"hidden"}
      />
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.defaultValue ? (
              format(props.defaultValue, "PPP")
            ) : (
              <span>{props.placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover> */}
    </>
  );
};
