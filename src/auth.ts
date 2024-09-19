import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { baseUrl } from "./services";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      userId?: string;
    } & DefaultSession["user"];
  }
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("authorize");
        const response = await fetch(`${baseUrl}/users/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const { accessToken, refreshToken }: TokenResponse =
          await response.json();

        if (response.ok) {
          return { accessToken, refreshToken };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, refreshToken } = user;
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.userId = accessToken && (jwt.decode(accessToken)?.sub as string);
      }

      return { ...token };
    },
    async session({ session, token }) {
      if (token) {
        const { accessToken, refreshToken, userId } = token;
        session.accessToken = accessToken as string;
        session.refreshToken = refreshToken as string;
        session.user.userId = userId as string;
      }
      console.log(token);
      console.log(session);

      return { ...session };
    },
  },
});
