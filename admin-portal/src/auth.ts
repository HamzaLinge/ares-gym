import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import { DefaultSession } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { JWT } from "next-auth/jwt";

import { TToken, TUser, TUserLogged } from "@/app/auth/_utils/types";
import { fetchData } from "@/utils/fetch-data";

declare module "next-auth" {
  interface User {
    dataUser: TUser;
    tokens: TToken;
  }
  interface Session {
    user: TUser & DefaultSession["user"];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
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
       * The `jwt` callback is invoked when the user is being signed in.
       * `user` param contains the result data from the fetch api login (provider's authorize method),
       * which for now is: {dataUser: TUser, tokens: TToken}.
       */
      if (user && user?.dataUser && user?.tokens) {
        token.dataUser = user.dataUser;
        token.tokens = user.tokens;
      }
      return token;
    },
    async session({ session, token }) {
      /**
       * Include dataUser fields into the default session's user property,
       * and the accessToken for further request fetch api
       */
      if (token && token?.dataUser && token?.tokens) {
        session.user = token.dataUser as any; // In order to bypass the session.user type checking
        session.accessToken = token.tokens.accessToken;
      }
      return session;
    },
  },
  ...authConfig,
});
