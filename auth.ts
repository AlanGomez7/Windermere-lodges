import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import {
  checkGoogleUser,
  checkUser,
  createUser,
  credentialCheck,
} from "./app/queries/auth";

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
        const u = user as unknown as any;
        return {
          ...token,
          userId: u.id,
          method: u.method ?? "google",
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        (session.user as any).method = token.method;
      }
      return session;
    },

    async signIn({user, profile, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        const dbUser = await checkUser(profile);

        (user as any).id = dbUser?.id

        if (user) {
          return true;
        }

        const result=await createUser({
          avatar: profile?.picture,
          email: profile?.email,
          password: "" + profile?.updated_at,
          name: profile?.name,
          sub: profile?.sub,
          role: "user",
        });

        (user as any).id = result?.id;
        (user as any).method = "google"

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
