import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import getDefaultProfile from '../../../utils/lens/getDefaultProfile'

import {siweUserAuthentication} from '../../../services/User'
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req, res) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try{
          const data = await siweUserAuthentication(req,credentials);
          return data
        }catch(err){
          console.trace(err);
          return null
        }
      },
    }),
  ]

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin")

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop()
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      session: async ({ session, token }) => {
        const defProf = token?.sub? await getDefaultProfile("" + token.sub):null
        console.log(defProf)
        session.address = "" + token.sub
        session.handle = defProf?.handle
        session.profileId = defProf?.id
        session.canUseRelay=  defProf?.dispatcher?.canUseRelay
        session.user.address = "" + token.sub
        return session
      },
    }
  })
}