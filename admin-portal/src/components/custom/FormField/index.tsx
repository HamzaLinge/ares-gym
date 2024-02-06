import { ReactElement } from "react";

import FormError from "@/components/ui/FormError";
import { TFormFieldProps } from "./types";
import {
  renderDatePicker,
  renderInput,
  renderSelect,
  renderTextarea,
} from "./utils";

// FormField component definition
function FormField(props: TFormFieldProps): ReactElement {
  const renderField = (): ReactElement | null => {
    switch (props.typeField) {
      case "input":
        return renderInput(props);
      case "textarea":
        return renderTextarea(props);
      case "select":
        return renderSelect(props);
      case "datepicker":
        return renderDatePicker(props);
      default:
        return null;
    }
  };

  return (
    <div className={`relative grid w-full gap-y-1.5 ${props.className}`}>
      {renderField()}
      {props.messageError && (
        <FormError
          messageError={props.messageError}
          className="absolute bottom-0 translate-y-[calc(100%_+_2px)]"
        />
      )}
    </div>
  );
}

export default FormField;
