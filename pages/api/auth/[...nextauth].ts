
import { oAUthToDbUser } from "@/lib/user/getUser";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    // ...add more providers here
  ],
  session: {
    maxAge: 2592000, /// 30d
    updateAge: 86400
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('signIn', { user, account, profile, email, credentials })
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, user, token }) {
      // console.log('session', { session, user, token })
      // session.user.accessToken = token.accessToken
      // session.user.refreshToken = token.refreshToken
      session.user.sid = token.sid
      session.user.role = token.role
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('jwt', { token, user, account, profile, isNewUser });
      if (account) {
        // token.accessToken = account.access_token;
        switch( account.type ){
          case 'oauth':
            const data = await oAUthToDbUser(user?.email || '', user?.name || '', user?.image|| '', account?.provider|| '')
            token.sid = data.sid
            token.role = data.role
          break
          // case 'credentials':
          //   token.user = user;
          // break
        }
      }
      
      return token
    }
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  //   maxAge: 60 * 60 * 24 * 30,
  //   // async encode({token, secret}) {
      
  //   //   return jwt.sign(token as JWT , secret)
  //   // },
  //   // decode() {},
  // },
  
  
}
export default NextAuth(authOptions)