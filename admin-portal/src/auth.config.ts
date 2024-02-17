import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { fetchData } from "@/utils/fetch-data";
import { TUserLogged } from "@/app/auth/_utils/types";

export default {
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
        return res.data;
      },
    }),
  ],
} satisfies NextAuthConfig;
