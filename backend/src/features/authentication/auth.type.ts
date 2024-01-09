import { IUser } from "../../models/User";

// CREDENTIALS PROVIDERS -----------------------------------------------------------------------------
export enum CredentialsProviders {
  local = "local",
  google = "google",
  facebook = "facebook",
}

export type TCredentialsProviders = {
  provider: CredentialsProviders;
  id?: string;
};

// GENDERS for User ------------------------------------------------------------
export enum GendersUser {
  male = "male",
  female = "female",
}

export type TGenderUser = GendersUser;

// ROLES --------------------------------------------------------------------------------------------
export enum Roles {
  admin = "admin",
  moderator = "moderator",
  subscriber = "subscriber",
}

export type TRole = Roles;

// USER DATA which has to be returned after login or register ------------------------------------------
export type TUserData = {
  _id: string;
  firstName: string;
  lastName: string;
  picture?: string;
};

// TOKENS ---------------------------------------------------------------------------------------------
export type TTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAccessToken?: number;
  expiresRefreshToken?: number;
};
/*
 *** Align User (from passport) with IUser (from /models/User.ts),
 * in order to extend Express Request Types (eg: req.user: IUser)
 */
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

/**
 POST /auth/check-email-availability
 */
export interface IRequest_auth_checkEmail {
  email: string;
}

export interface IResponse_auth_checkEmail {
  message: string;
}

/**
 POST /auth/local/login
 */
export interface IRequest_auth_local_login {
  email: string;
  password: string;
}

/**
 POST /auth/local/register
 */
export interface IRequest_auth_local_register {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
}

export interface IResponse_auth_logged {
  user: Omit<IUser, "password">;
  tokens: TTokens;
}
