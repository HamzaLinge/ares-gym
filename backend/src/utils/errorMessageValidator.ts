import { capitalize } from "./capitalize";

export const errorMessageValidator = {
  notEmpty: (name: string): string => `${capitalize(name)} must be provided`,
  string: (name: string): string => `${capitalize(name)} must be a string type`,
  int: (name: string, min?: number, max?: number): string =>
    `${capitalize(name)} must be a number type${
      min ? `, and upper then ${min}` : ""
    }${max ? `, and lower then ${max}` : ""}`,
  mongoID: (name: string): string =>
    `${capitalize(name)} must be a valid MongoDB ID`,
  validDate: (name: string): string =>
    `${capitalize(name)} must be a valid date (eg: YYYY-MM-DD)`,
  docNotFound: (name: string): string =>
    `There is no ${capitalize(name)} found for this ID`,
  range: (name: string, start: number, end: number): string =>
    `${capitalize(name)} must be between ${start} and ${end}`,
  bool: (name: string): string => `${name} must be true or false`,
};
