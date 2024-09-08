/* eslint-disable @typescript-eslint/naming-convention */
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const Auth = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      try {
        if (user) {
          token.role = user.role;
        }

        return token;
      } catch {
        throw new Error("Failed to process JWT callback");
      }
    },
    session({ session, token }) {
      try {
        session.user = {
          ...session.user,
          role: token.role,
        };
        return session;
      } catch {
        throw new Error("Failed to process session callback");
      }
    },
  },
});
