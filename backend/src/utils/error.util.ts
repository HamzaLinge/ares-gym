import { capitalize } from "./string.util";

export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER_ERROR: 500,
};

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
  // isLengthMin: (name: string, minEqual: number): string =>
  //   `${stringUtil(name)} length must exceed ${minEqual - 1}`,
  isFilesUploaded: () => "There are no files found",
  isFileUploaded: () => "You need to upload a file",
  isArray: (name: string): string => `${capitalize(name)} must be an array`,
  isObject: (name: string): string => `${capitalize(name)} must be an object`,
  isNumeric: (name: string): string => `${capitalize(name)} must be a number`,
  isEmail: (name: string): string =>
    `${capitalize(name)} must be a valid email`,
  isLengthMin: (name: string, min: number): string =>
    `${capitalize(name)} must be at least ${min} characters long`,
  mustContainsNumber: (name: string): string =>
    `${capitalize(name)} must contain a number`,
  mustNotContainsSpaces: (name: string): string =>
    `${capitalize(name)} must not contain spaces`,
  notMatchString: (name1: string, name2: string): string =>
    `${capitalize(name1)} does not match with ${capitalize(name2)}`,
  notCommonWord: (name: string): string =>
    `Do not use a common word as the ${name}`,
  invalidValue: (name: string): string =>
    `Please, choose a valid value for ${capitalize(name)}`,
};
