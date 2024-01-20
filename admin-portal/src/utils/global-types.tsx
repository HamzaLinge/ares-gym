export type TErrorValidation = { [key: string]: string };

export interface ICustomError {
  message: string;
  stack?: string;
  errors?: TErrorValidation;
}

export type TStateAction<T> = { [key: string]: T; error?: ICustomError };
