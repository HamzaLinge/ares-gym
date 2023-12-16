// import passport from "passport";
// import { Strategy as FacebookStrategy } from "passport-facebook";
// import { envUtil } from "../../utils/envUtil";
//
// export default function facebookAuthConfig() {
//   passport.use(
//     <passport.Strategy>new FacebookStrategy(
//       {
//         clientID: envUtil("FACEBOOK_CLIENT_ID"),
//         clientSecret: envUtil("FACEBOOK_CLIENT_SECRET"),
//         callbackURL: "/authentication/facebook/callback",
//       },
//       function (accessToken, refreshToken, profile, done) {
//         if (!profile) return done(new Error("Facebook Authentication Error"));
//         done(null, profile);
//       }
//     )
//   );
// }
