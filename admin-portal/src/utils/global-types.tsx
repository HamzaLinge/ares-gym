export type TErrorValidation = { [key: string]: string };

export interface ICustomError {
  message: string;
  stack?: string;
  errors?: TErrorValidation;
}
