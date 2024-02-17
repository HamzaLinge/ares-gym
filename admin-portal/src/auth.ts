import NextAuth from "next-auth";

import { TToken, TUser } from "@/app/auth/_utils/types";
import authConfig from "@/auth.config";

declare module "next-auth" {
  interface User {
    dataUser: TUser;
    tokens: TToken;
  }
  interface Session {
    dataUser: TUser;
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
    async jwt({ token, user }) {
      /**
       * The `jwt` callback is invoked only when the user is being signed in on the first time.
       * `user` param contains the result data from the fetch api login, which for now is: {dataUser: TUser, tokens: TToken}.
       */
      console.log({ userParamJwtCallback: user });

      if (user.dataUser && user.tokens) {
        token.dataUser = user.dataUser;
        token.tokens = user.tokens;
      }
      return token;
    },
    async session({ session, token }) {
      // if (token.user && token.tokens) {
      //   session.dataUser = token.dateUser as TUser;
      //   session.tokens = token.tokens as TToken;
      // }
      console.log({ sessionCallback: session });

      return session;
    },
  },
  ...authConfig,
});
