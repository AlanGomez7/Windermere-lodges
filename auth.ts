import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { checkUser, createUser, credentialCheck } from "./app/queries/auth";
import prisma from "./lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  // adapter: PrismaAdapter(prisma),

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
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; // Add role to token
      }
      return token;
    },

    async signIn({ profile }) {
      try {
        const user = await checkUser(profile);

        if (user) {
          console.log(user)
          return true;
        }

        // console.log(profile, "*****************()()()()()()()()(()()()()()()()")

        await createUser({
          avatar: profile?.picture,
          email: profile?.email,
          password: ''+profile?.updated_at,
          name:profile?.name,
          sub:profile?.sub,
          role:'user'
        });

        return true;
      } catch (err) {
        console.log(err)
        return false;
      }
    },
  },
});
