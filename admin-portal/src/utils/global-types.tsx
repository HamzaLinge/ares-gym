export type TErrorValidation = { [key: string]: string };

export interface IResponseAPI {
  status: number;
}

export interface ICustomError {
  message: string;
  stack?: string;
  errors?: TErrorValidation;
}

export interface ISuccessAPI<Interface> extends IResponseAPI {
  success: true;
  data: Interface;
}

export interface IErrorAPI extends IResponseAPI {
  success: false;
  error: ICustomError;
}

export type TStateAction<T> = { [key: string]: T; error?: ICustomError };
