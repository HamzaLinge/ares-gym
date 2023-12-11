import { Request, Response } from "express";

import UserModel from "../../models/User";

import { getTokens } from "../../utils/jwtHelper";
import {
  CredentialsProviders,
  Roles,
  TUserData,
} from "../../types/common.type";
import {
  ICheckEmailRequest,
  ICheckEmailResponse,
  ILoginRequest,
  IRegisterRequest,
  TLoggedResponse,
} from "./auth.types";
import { Profile } from "passport-google-oauth20";

export async function checkEmail(
  req: Request<any, any, ICheckEmailRequest>,
  res: Response<ICheckEmailResponse>
): Promise<Response<ICheckEmailResponse>> {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(409)
        .send({ success: false, message: "This email is already used" });
    return res
      .status(200)
      .send({ success: true, message: "This email is available" });
  } catch (errorCheckEmail) {
    console.log(
      `Something went wrong during : check email => ${errorCheckEmail}`
    );
    return res.status(500).send({
      success: false,
      message: `Something went wrong during : check email`,
    });
  }
}

// NOTE: Type the return register
export const register = async (
  req: Request<any, any, IRegisterRequest>,
  res: Response<TLoggedResponse>
) => {
  try {
    delete req.body["confirmPassword"];
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (user) {
      return res
        .status(409)
        .send({ success: false, message: "This email is already used" });
    }
    const newUser = await UserModel.create({
      credentialsProvider: { provider: CredentialsProviders.local, id: null },
      role: req.body.role ? req.body.role : Roles.subscriber,
      ...req.body,
    });
    const tokens = getTokens(newUser._id.toString());
    const userData: TUserData = {
      _id: newUser._id.toString(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
    return res.status(200).send({
      success: true,
      tokens: tokens,
      userData: userData,
    });
  } catch (errorRegister) {
    console.log(`Something went wrong during : register => ${errorRegister}`);
    res.status(500).send({
      success: false,
      message: `Something went wrong during : register`,
    });
  }
};

export const login = async (
  req: Request<any, any, ILoginRequest>,
  res: Response<TLoggedResponse>
): Promise<Response<TLoggedResponse>> => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select(
      "password firstName lastName picture"
    );
    if (!user)
      return res.status(404).send({
        success: false,
        message: "There is no user registered with this email",
      });
    try {
      const matchedPassword = await user.matchPassword(password);
      if (!matchedPassword) {
        return res
          .status(401)
          .send({ success: false, message: "Incorrect password" });
      }
    } catch (errorMatchedPassword) {
      console.log(
        `Something went wrong during verification password => ${errorMatchedPassword}`
      );
      return res.status(500).send({
        success: false,
        message: `Something went wrong during verification password`,
      });
    }
    const tokens = getTokens(user._id.toString());
    const userData: TUserData = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return res.status(200).send({ success: true, tokens, userData });
  } catch (errorLogin) {
    console.log(`Something went wrong during : login => ${errorLogin}`);
    return res.status(500).send({
      success: false,
      message: `Something went wrong during : login`,
    });
  }
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
