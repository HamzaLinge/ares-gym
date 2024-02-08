import { ReactElement } from "react";

import FormError from "@/components/ui/FormError";
import { TFormFieldProps } from "./types";
import {
  renderDatePicker,
  renderFilePicker,
  renderInput,
  renderSelect,
  renderSubmitButton,
  renderTextarea,
} from "./utils";

// FormField component definition
function FormField(props: TFormFieldProps): ReactElement {
  const renderField = (): ReactElement | null => {
    switch (props.typeField) {
      case "text":
        return renderInput(props);
      case "textarea":
        return renderTextarea(props);
      case "select":
        return renderSelect(props);
      case "datepicker":
        return renderDatePicker(props);
      case "filepicker":
        return renderFilePicker(props);
      case "submit":
        return renderSubmitButton();
      default:
        return null;
    }
  };

  return (
    <>
      {renderField()}
      {props.messageError && <FormError messageError={props.messageError} />}
    </>
  );
}

export default FormField;
