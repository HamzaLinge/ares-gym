import { DefaultSession } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
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

export default {
  session: { strategy: "jwt" },
  // secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const res = await fetchData<TUserLogged>({
          url: "/auth/local/login",
          method: "POST",
          body: credentials,
        });
        if (!res.success) {
          /**
           * According on the next-auth@5 documentation,
           * this `return null;` will throw a next-auth `CredentialsSignin` error type,
           * which is for `Invalid Credentials`,
           * without leaking which parts of the credentials are incorrect
           * */
          // throw new Error(res.error.message);
          return null;
        }
        /**
         * Since this is a Credentials Provider,
         * the returned object (res.data) will be passed to `jwt` callback inside `user` param
         */
        return {
          dataUser: res.data.dataUser, // Spread user data to match the User type
          tokens: res.data.tokens, // Include tokens if you need them in the JWT callback
        };
      },
    }),
  ],
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
} satisfies NextAuthConfig;
