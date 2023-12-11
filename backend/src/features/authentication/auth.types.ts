import {
  IResponse,
  TGenderUser,
  TRole,
  TTokens,
  TUserData,
} from "../../types/common.type";

// Check Email Route
export interface ICheckEmailRequest {
  email: string;
}

export interface ICheckEmailResponse {
  success: boolean;
  message: string;
}

// Register and Login Routes
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  confirmPassword?: string;

  role?: TRole;

  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: TGenderUser;

  birthday?: Date;
  picture?: string;
}

interface ILoggedSuccessResponse extends IResponse {
  tokens: TTokens;
  userData: TUserData;
}

interface ILoggedErrorResponse extends IResponse {
  message: string;
}

export type TLoggedResponse = ILoggedSuccessResponse | ILoggedErrorResponse;
