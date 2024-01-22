export type TErrorValidation = { [key: string]: string };

export interface IResponseAPI {
  status: number;
}

export interface ICustomError {
  message: string;
  stack?: string;
  errors?: TErrorValidation;
}

export interface IErrorAPI extends IResponseAPI {
  error: ICustomError;
}

export type TStateAction<T> = { [key: string]: T; error?: ICustomError };
