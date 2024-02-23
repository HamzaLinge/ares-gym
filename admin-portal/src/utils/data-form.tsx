type FormDataFilterCallback = (
  name: string,
  value: FormDataEntryValue,
) => boolean;

function defaultFilteredFormDataCallback(
  name: string,
  value: FormDataEntryValue,
) {
  if (value instanceof File && value.size === 0) {
    return false;
  } else if (typeof value === "string" && value.length === 0) {
    return false;
  }
  return true;
}

export function filterEmptyDataFormFields(
  formData: FormData,
  callback: FormDataFilterCallback = defaultFilteredFormDataCallback,
): FormData {
  const filteredFormData = new FormData();
  for (const [key, value] of formData.entries()) {
    if (callback(key, value)) {
      filteredFormData.append(key, value);
    }
  }
  return filteredFormData as FormData;
}
