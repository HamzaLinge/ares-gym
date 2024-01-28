export const isArrayOfStrings = (arr: any): arr is string[] => {
  if (Array.isArray(arr)) {
    if (arr.length > 0) {
      return arr.every((value) => typeof value === "string");
    }
  }
  return false;
};
