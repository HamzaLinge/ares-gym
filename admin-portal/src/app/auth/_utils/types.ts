// CREDENTIALS PROVIDERS -----------------------------------------------------------------------------
import { TErrorValidation } from "@/utils/global-types";

enum CredentialsProviders {
  local = "local",
  google = "google",
  facebook = "facebook",
}

type TCredentialsProviders = {
  provider: CredentialsProviders;
  id?: string;
};

// GENDERS for User ------------------------------------------------------------
enum GendersUser {
  male = "male",
  female = "female",
}

type TGenderUser = GendersUser;

// ROLES --------------------------------------------------------------------------------------------
enum Roles {
  admin = "admin",
  moderator = "moderator",
  subscriber = "subscriber",
}

type TRole = Roles;
// TOKEN Type --------------------------------------------------------------------------------------
export type TToken = {
  accessToken: string;
  refreshToken: string;
  expiresAccessToken: number;
  expiresRefreshToken: number;
};
// USER Type ------------------------------------------------------------------------------------------
export type TUser = {
  _id: string;
  credentialsProvider: TCredentialsProviders;
  email: string;
  role: TRole;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  gender?: TGenderUser;
  birthday?: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
};
export type TError = {
  message: string;
  errors?: TErrorValidation[];
};

// USER LOGGED DATA ---------------------------------------------------------------------------------------
export type TUserLogged = {
  dataUser: TUser;
  tokens: TToken;
};
