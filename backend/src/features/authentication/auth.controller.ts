import { NextFunction, Request, Response } from "express";

import UserModel, { IUser } from "../../models/User";

import { CustomError } from "../../types/global.type";
import { HttpStatusCodes } from "../../utils/error.util";
import { getTokens } from "../../utils/jwt.util";
import {
  CredentialsProviders,
  IRequest_auth_checkEmail,
  IRequest_auth_local_login,
  IRequest_auth_local_register,
  IResponse_auth_checkEmail,
  IResponse_auth_logged,
  Roles,
} from "./auth.type";

export async function auth_checkEmailAvailability_controller(
  req: Request<any, any, IRequest_auth_checkEmail>,
  res: Response<IResponse_auth_checkEmail>,
  next: NextFunction,
) {
  const emailRegex = new RegExp(`^${req.body.email}$`, "i");
  let user = await UserModel.findOne({ email: emailRegex });
  if (user) {
    return next(
      new CustomError("This email is already used", HttpStatusCodes.CONFLICT),
    );
  }
  res.status(HttpStatusCodes.OK).send({ message: "This email is available" });
}

export const auth_local_login_controller = async (
  req: Request<any, any, IRequest_auth_local_login>,
  res: Response<IResponse_auth_logged>,
  next: NextFunction,
) => {
  const emailRegex = new RegExp(`^${req.body.email}$`, "i");
  let user: IUser | null = await UserModel.findOne({ email: emailRegex });
  if (!user)
    return next(
      new CustomError(
        "There is no user registered with this email",
        HttpStatusCodes.NOT_FOUND,
      ),
    );
  const matchedPassword = await user.matchPassword(req.body.password);
  if (!matchedPassword) {
    return next(
      new CustomError("Password incorrect", HttpStatusCodes.UNAUTHORIZED),
    );
  }
  const tokens = getTokens(user._id.toString());
  user["password"] = undefined;
  delete user["password"];
  res.status(HttpStatusCodes.OK).send({
    dataUser: user,
    tokens,
  });
};

export const auth_local_register_controller = async (
  req: Request<any, any, IRequest_auth_local_register>,
  res: Response<IResponse_auth_logged>,
  next: NextFunction,
) => {
  const emailRegex = new RegExp(`^${req.body.email}$`, "i");
  const userExists = await UserModel.findOne({
    email: emailRegex,
  });
  if (userExists) {
    return next(
      new CustomError(
        "There is already a user with this email",
        HttpStatusCodes.CONFLICT,
      ),
    );
  }
  let user: IUser = await UserModel.create({
    credentialsProvider: { provider: CredentialsProviders.local },
    role: Roles.subscriber,
    ...req.body,
  });
  const tokens = getTokens(user._id.toString());
  delete user["password"];
  res.status(HttpStatusCodes.OK).send({
    dataUser: user,
    tokens,
  });
};

/*
 *** TODO: Finish Google and Facebook Authentications after finishing the first version of the project
 */
// export const googleAuthCallback = async (req: Request, res: Response) => {
//   const profile = req.user;
//   const user = await UserModel.findOne({
//     "credentialsProvider.id": profile.id,
//   });
//   if (!user) {
//     if (!profile.emails) {
//     }
//   }
// };

// export const facebookAuthCallback = async (req: Request, res: Response) => {
//   console.log(req.user);
//   res
//     .status(200)
//     .json({ success: true, message: "Successfully logged by Facebook" });
// };
