/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/naming-convention */
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const { auth, handlers, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.role = user.role;
        }

        return token;
      } catch {
        throw new Error("Failed to process JWT callback");
      }
    },
    async session({ session, token }) {
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
