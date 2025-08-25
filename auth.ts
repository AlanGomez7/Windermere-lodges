import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { credentialCheck } from "./app/queries/auth";


export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

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

    Google,
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
