import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { JWT } from 'next-auth/jwt';
import type { Account, Session, NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      // After initial sign in, exchange provider id_token with backend to obtain backend tokens
      if (account?.provider === 'google' && account.id_token) {
        try {
          const base =
            process.env.NEXT_PUBLIC_API_BASEURL ||
            process.env.NEXT_PUBLIC_API_URL ||
            'http://localhost:8080';
          const res = await fetch(`${base}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_token: account.id_token }),
          });
          if (res.ok) {
            const data = await res.json();
            token.accessToken = data?.data?.accessToken;
            token.refreshToken = data?.data?.refreshToken;
          }
        } catch {
          // ignore
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // expose backend access token to client session
      const extended = token as JWT & { accessToken?: string };
      (session as Session & { accessToken?: string }).accessToken = extended.accessToken;
      return session;
    },
  },
};

// Ensure NEXTAUTH_URL defaults to the frontend origin when not set.
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = 'http://localhost:3000';
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
