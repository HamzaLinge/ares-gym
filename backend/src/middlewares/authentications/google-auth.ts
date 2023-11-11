// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";
//
// export default function googleAuthConfig() {
//   passport.use(
//     <passport.Strategy>new GoogleStrategy(
//       {
//         clientID: getEnvironmentVariable("GOOGLE_CLIENT_ID"),
//         clientSecret: getEnvironmentVariable("GOOGLE_CLIENT_SECRET"),
//         callbackURL: "/authentication/google/callback",
//       },
//       (accessToken, refreshToken, profile, done) => {
//         if (!profile) return new Error("Google Authentication Error");
//         return done(null, profile);
//       }
//     )
//   );
// }
