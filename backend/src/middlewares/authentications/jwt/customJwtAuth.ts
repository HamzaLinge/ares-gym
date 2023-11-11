/*
 NOTE:
  - The custom JWT authentication middleware's role is to intercept Passport's default
  - handling of authentication errors and provide a more tailored response to the client
 */

import { Request, Response, NextFunction } from "express";
import passport from "passport";

import { IUser } from "../../../models/User";

export function customJwtAuth(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: IUser | undefined | false, info: any) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong during the JWT authentication",
        });
      }
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: info?.message || "Unauthorized" });
      }
      req.user = user;
      return next();
    }
  )(req, res, next);
}
