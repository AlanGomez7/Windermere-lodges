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

    async signIn({ user, profile, account }) {
      try {
        // Let credentials provider handle separately
        if (account?.provider === "credentials") {
          return true;
        }

        // Check if user already exists in DB
        const dbUser = await checkUser(profile);

        if (dbUser) {
          if (dbUser.isBlocked) {
            // Deny login for blocked users
            throw new Error("BlockedUser");
          }

          // attach db ID for session callback
          (user as any).id = dbUser.id;
          return true;
        }

        // Create new user if not found
        const result = await createUser({
          avatar: profile?.picture,
          email: profile?.email,
          password: "" + profile?.updated_at, // consider null instead
          name: profile?.name,
          sub: profile?.sub,
          role: "user",
        });

        (user as any).id = result?.id;
        (user as any).method = "google";

        return true;
      } catch (err: any) {
        console.error("Sign-in error:", err);

        // Forward specific error to error page
        if (err.message === "BlockedUser") {
          return "/auth/error?error=BlockedUser";
        }

        return false;
      }
    },
  },
});
