/*
 NOTE:
  - The custom JWT authentication middleware's role is to intercept Passport's default
  - handling of authentication errors and provide a more tailored response to the client
 */

import { Request, Response, NextFunction } from "express";
import passport from "passport";

import { IUser } from "../../../models/User";
import { CustomError } from "../../../types/common.types";

export function customJwtAuth(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: IUser | undefined | false, info: any) => {
      if (err) {
        next(
          new CustomError(
            "Something went wrong during the JWT authentication",
            500
          )
        );
      } else {
        if (!user) {
          next(new CustomError(info?.message || "Unauthorized", 401));
        } else {
          req.user = user;
          next();
        }
      }
    }
  )(req, res, next);
}
