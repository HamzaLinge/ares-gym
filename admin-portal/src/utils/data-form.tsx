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

export function inspectFormData(formData: FormData) {
  for (var pair of formData.entries()) {
    if (typeof pair[1] === "object") {
      console.log(`${pair[0]}: ${pair[1]}, ${pair[1].name}`);
    } else console.log(pair[0] + ": " + pair[1] + ", " + typeof pair[1]);
  }
}

function appendFormData(
  formData: FormData,
  key: string,
  value: FormDataEntryValue,
) {
  if (value instanceof File) {
    formData.append(key, value);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendFormData(formData, `${key}[${index}]`, item);
    });
  } else if (typeof value === "object" && value !== null) {
    Object.keys(value).forEach((subKey) => {
      appendFormData(formData, `${key}[${subKey}]`, value[subKey]);
    });
  } else {
    formData.append(key, value);
  }
}

export function createGenericFormData(input: Record<string, unknown>) {
  const formData = new FormData();
  Object.keys(input).forEach((key) => {
    appendFormData(formData, key, input[key]);
  });
  return formData;
}
