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
        return renderText(props);
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
    <div className={"w-auto"}>
      {renderField()}
      {props.messageError && <FormError messageError={props.messageError} />}
    </div>
  );
}

export default FormField;
