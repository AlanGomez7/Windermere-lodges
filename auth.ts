import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { credentialCheck } from "./app/queries/auth";
import prisma from "./lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        // const { email } = credential;

        const user = await credentialCheck({ email, password });
        return user;
      },
    }),

    GoogleProvider({
      // clientId: process.env.GOOGLE_CLIENT_ID,
      // clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        console.log(profile)
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.username,
          avatar: profile.picture,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; // Add role to token
      }
      return token;
    },
  },
});
