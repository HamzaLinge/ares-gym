export type TErrorValidation = Partial<Record<string, string>>;

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

export class CustomClassErrorApi extends Error {
  constructor(errorApi: IErrorAPI) {
    super(errorApi.error.message);
    this.name = "Error API";
  }
}
