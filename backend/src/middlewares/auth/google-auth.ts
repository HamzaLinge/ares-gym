// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { envUtil } from "../../utils/envUtil";
//
// export default function googleAuthConfig() {
//   passport.use(
//     <passport.Strategy>new GoogleStrategy(
//       {
//         clientID: envUtil("GOOGLE_CLIENT_ID"),
//         clientSecret: envUtil("GOOGLE_CLIENT_SECRET"),
//         callbackURL: "/authentication/google/callback",
//       },
//       (accessToken, refreshToken, profile, done) => {
//         if (!profile) return new Error("Google Authentication Error");
//         return done(null, profile);
//       }
//     )
//   );
// }
