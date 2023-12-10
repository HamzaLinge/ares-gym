import { capitalize } from "./capitalize";

export const errorMessageValidator = {
  notEmpty: (name: string): string => `${capitalize(name)} must be provided`,
  isString: (name: string): string =>
    `${capitalize(name)} must be a string type`,
  isInt: (name: string): string => `${capitalize(name)} must be a number`,
  isIntMin: (name: string, min: number): string =>
    `${capitalize(name)} must be upper then ${min}`,
  isMongoId: (name: string): string =>
    `${capitalize(name)} must be a valid MongoDB ID`,
  isDate: (name: string): string =>
    `${capitalize(name)} must be a valid date (eg: YYYY-MM-DD)`,
  docNotFound: (name: string): string =>
    `There is no ${capitalize(name)} found for this ID`,
  isRange: (name: string, start: number, end: number): string =>
    `${capitalize(name)} must be between ${start} and ${end}`,
  isBool: (name: string): string => `${capitalize(name)} must be true or false`,
  isLengthMin: (name: string, minEqual: number): string =>
    `${capitalize(name)} length must exceed ${minEqual - 1}`,
  isFilesUploaded: () => "You need to upload files",
  isFileUploaded: () => "You need to upload a file",
  isArray: (name: string): string => `${capitalize(name)} must be an array`,
  isObject: (name: string): string => `${capitalize(name)} must be an object`,
  isNumeric: (name: string): string => `${capitalize(name)} must be a number`,
};
