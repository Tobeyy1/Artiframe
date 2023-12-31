import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    subscription: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      subscription: string;
    };
    token: {
      subscription: string;
    };
  }
}
