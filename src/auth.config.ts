/* eslint-disable @typescript-eslint/naming-convention */
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      authorize: (credentials) => {
        return new Promise((resolve, reject) => {
          try {
            const user = credentials;
            if (user) {
              resolve(user);
            } else {
              reject(new Error("Authentication failed"));
            }
          } catch {
            reject(new Error("Authentication failed"));
          }
        });
      },
    }),
  ],
} as NextAuthConfig;
