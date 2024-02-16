import NextAuth from "next-auth";

import { TToken, TUserData, TUserLogged } from "@/app/auth/_utils/types";
import authConfig from "@/auth.config";

declare module "next-auth" {
  interface User {
    user: TUserData;
    tokens: TToken;
  }
  interface Session {
    user: TUserData;
    tokens: TToken;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    /**
     * The `jwt` callback is invoked only when the user is being signed in on the first time
     */
    async jwt({ token, user, account, profile, session }) {
      /**
       * `user` param contains the result data from the fetch api login, which for now is: {user: {}, tokens: {}}
       */
      token.user = user.user;
      token.tokens = user.tokens;
      return token;
    },
    async session({ session, token, user }) {
      if (token.user && token.tokens) {
        session.user = token.user as TUserData;
        session.tokens = token.tokens as TToken;
      }
      return session;
    },
  },
  ...authConfig,
});
