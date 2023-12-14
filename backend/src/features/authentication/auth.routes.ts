import { Router } from "express";

import { checkEmail, login, register } from "./auth.controllers";

import { rules_check_email, rules_login, rules_register } from "./auth.rules";
import { validateRules } from "../../middlewares/validateRules";

const router = Router();

/*
 *** The authentication process is based on the ACCESS TOKEN, which means JWT (JsonWebToken),
 * independently on the login method (eg: Google or Facebook)
 */

// LOCAL AUTHENTICATION
router.post("/check-email", rules_check_email, validateRules, checkEmail);
router.post("/register", rules_register, validateRules, register);
router.post("/login", rules_login, validateRules, login);

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

export default router;
