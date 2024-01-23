/*
 NOTE:
  - The custom JWT authentication middleware's role is to intercept Passport's default
  - handling of authentication errors and provide a more tailored response to the client
 */

import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { IUser } from "../../../models/User";
import { CustomError } from "../../../types/global.type";
import { HttpStatusCodes } from "../../../utils/error.util";

export function jwtAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: IUser | false | undefined, info: any) => {
      if (err) {
        next(
          new CustomError(
            "Something went wrong during the JWT authentication",
            HttpStatusCodes.INTERNAL_SERVER_ERROR
          )
        );
      } else {
        if (!user) {
          next(new CustomError(info?.message || "Unauthorized", 401));
        } else {
          req.user = user as IUser;
          // console.log("JWT Success ------------");
          next();
        }
      }
    }
  )(req, res, next);
}
