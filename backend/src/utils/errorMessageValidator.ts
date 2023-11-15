import { capitalize } from "./capitalize";

export const errorMessageValidator = {
  notEmpty: (name: string): string => `${capitalize(name)} must be provided`,
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
