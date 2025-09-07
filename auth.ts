import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { checkUser, createUser, credentialCheck } from "./app/queries/auth";

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
        return {
          ...token,
          userId: user.id,
        };
      }

      return token;
    },

    async session({ session, token }) {
      console.log(token, session)

      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async signIn({ profile, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        const user = await checkUser(profile);

        if (user) {
          return true;
        }

        await createUser({
          avatar: profile?.picture,
          email: profile?.email,
          password: "" + profile?.updated_at,
          name: profile?.name,
          sub: profile?.sub,
          role: "user",
        });

        return true;
        
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
