import { ReactElement } from "react";

import FormError from "@/components/ui/FormError";
import { TFormFieldProps } from "./types";
import {
  renderDatePicker,
  renderFilePicker,
  renderText,
  renderSelect,
  renderSubmitButton,
  renderTextarea,
} from "./utils";

// FormField component definition
function FormField(props: TFormFieldProps): ReactElement {
  const renderField = (): ReactElement | null => {
    switch (props.typeField) {
      case "text":
        return renderText({ textProps: props.textProps });
      case "textarea":
        return renderTextarea({ textareaProps: props.textareaProps });
      case "select":
        return renderSelect({ selectProps: props.selectProps });
      case "datepicker":
        return renderDatePicker({ datepickerProps: props.datepickerProps });
      case "filepicker":
        return renderFilePicker({ filepickerProps: props.filepickerProps });
      case "submit":
        return renderSubmitButton();
      default:
        return null;
    }
  };

  return (
    <div className={"w-full"}>
      {renderField()}
      {props.messageError && <FormError messageError={props.messageError} />}
    </div>
  );
}

export default FormField;
