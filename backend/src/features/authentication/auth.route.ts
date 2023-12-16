import { Router } from "express";

import {
  auth_checkEmailAvailability_controller,
  auth_local_login_controller,
  auth_local_register_controller,
} from "./auth.controller";

import {
  auth_checkEmailAvailability_rules,
  auth_local_login_rules,
  auth_local_register_rules,
} from "./auth.rule";
import { validateRules } from "../../middlewares/validateRules";
import { asyncHandler } from "../../middlewares/asyncHandler";

const authRoutes = Router();

/*
 *** The authentication process is based on the ACCESS TOKEN, which means JWT (JsonWebToken),
 * independently on the login method (eg: Google or Facebook)
 */

// LOCAL AUTHENTICATION
authRoutes.post(
  "/check-email-availability",
  auth_checkEmailAvailability_rules,
  validateRules,
  asyncHandler(auth_checkEmailAvailability_controller)
);
authRoutes.post(
  "/local/login",
  auth_local_login_rules,
  validateRules,
  asyncHandler(auth_local_login_controller)
);
authRoutes.post(
  "/local/register",
  auth_local_register_rules,
  validateRules,
  asyncHandler(auth_local_register_controller)
);

/*
 *** TODO: Finish Google and Facebook Authentications after finishing the first version of the project
 */
// GOOGLE-AUTHENTICATION APIs
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: [
//       "openid",
//       "profile",
//       "email",
//       "https://www.googleapis.com/auth/user.birthday.read",
//       "https://www.googleapis.com/auth/user.phonenumbers.read",
//       "https://www.googleapis.com/auth/user.gender.read",
//     ],
//     session: false,
//   })
// );
// router.get(
//   "/google/callback",
//   passport.authenticate(
//     "google",
//     {
//       // failureRedirect: "/authentication/google/failure",
//       session: false,
//     }
//     // (err, user) => {
//     //   console.log(err);
//     //   console.log(user);
//     // }
//   ),
//   googleAuthCallback
// );
// router.get("/google/failure", (req, res) => {
//   console.log("Google Auth Failed !");
// });

// FACEBOOK-AUTHENTICATION APIs
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", {
//     session: false,
//     scope: ["email", "public_profile"],
//   })
// );
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/", session: false }),
//   facebookAuthCallback
// );

export default authRoutes;
