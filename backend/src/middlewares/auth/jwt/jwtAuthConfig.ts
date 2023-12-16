/*
 NOTE:
  The provided JWT strategy configuration is responsible
  for defining how Passport will authenticate users using a JWT token.
 */

/*
 NOTE:
  If the callback function for JWT Strategy is invoked,
  it means that Passport successfully found and extracted the Token (eg: payload)
 */
import passport from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";

import UserModel, { IUser } from "../../../models/User";
import { getEnv } from "../../../utils/env.util";

export function jwtAuthConfig() {
  const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // I can write my own extractor here
    secretOrKey: getEnv("JWT_SECRET_KEY"),
  };
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const user: IUser | null = await UserModel.findById(payload.idUser);
        if (!user) {
          return done(null, false, {
            message: "There is no user assigned to this token",
          });
        }
        done(null, user);
      } catch (errorLoadSubscriber) {
        console.log("Error Passport JWT Strategy Authentication :");
        console.log(errorLoadSubscriber);
        done(null, false, {
          message: "An error occurred while authenticating",
        });
      }
    })
  );
}
