export const isArrayOfStrings = (arr: any): arr is string[] => {
  if (Array.isArray(arr)) {
    if (arr.length > 0) {
      return arr.every((value) => typeof value === "string");
    }
  }
  return false;
};

export function returnFileSize(nbr: number) {
  if (nbr < 1024) {
    return `${nbr} bytes`;
  } else if (nbr >= 1024 && nbr < 1048576) {
    return `${(nbr / 1024).toFixed(1)} KB`;
  } else if (nbr >= 1048576) {
    return `${(nbr / 1048576).toFixed(1)} MB`;
  }
}
