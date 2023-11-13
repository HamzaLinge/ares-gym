import { IUser } from "../models/User";
import { ValidationError } from "express-validator";

// Define the interface for CustomError class
interface ICustomError {
  statusCode: number;
  message: string;
  error?: ValidationError[];
}

// Implement the CustomError class
export class CustomError extends Error implements ICustomError {
  statusCode: number;
  errors?: ValidationError[];

  constructor(message: string, statusCode: number, errors?: ValidationError[]) {
    super(message); // Call the constructor of the parent class (Error), because it handles the message property
    this.statusCode = statusCode;
    this.errors = errors;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

/*
 *** Align User (from passport) with IUser (from /models/User.ts),
 * in order to extend Express Request Types (eg: req.user: IUser)
 */
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
declare module "express-serve-static-core" {
  interface Request {
    fileId?: string; // Add fileUrl as an optional string property
  }
}

// CREDENTIALS PROVIDERS -----------------------------------------------------------------------------
export enum CredentialsProviders {
  local = "local",
  google = "google",
  facebook = "facebook",
}

// TOKENS ---------------------------------------------------------------------------------------------
export type TTokens = {
  accessToken: string;
  refreshToken?: string;
  expiresAccessToken?: number;
  expiresRefreshToken?: number;
};

// USER DATA which has to be returned after login or register ------------------------------------------
export type TUserData = {
  _id: string;
  firstName: string;
  lastName: string;
  picture?: string;
};

// ROLES --------------------------------------------------------------------------------------------
export enum Roles {
  admin = "admin",
  moderator = "moderator",
  subscriber = "subscriber",
}
export type TRole = Roles;

// GENDERS for User and Weightlifting Plan ------------------------------------------------------------
export enum GendersUser {
  male = "male",
  female = "female",
}
export type TGenderUser = GendersUser;

export enum GendersWeightliftingPlan {
  male = "male",
  female = "female",
  mix = "mix",
}
export type TGenderWeightliftingPlan = GendersWeightliftingPlan;

// TARGET DISCOUNT
export enum TargetsDiscount {
  weightlifting = "weightlifting",
  shopping = "shopping",
  coaching = "coaching",
}
export type TTargetDiscount = TargetsDiscount;

// RESPONSE Interface ---------------------------------------------------------------------------------------
export interface IResponse {
  success: boolean;
}
