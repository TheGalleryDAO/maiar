// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import {verifyUser, getUserImages} from '../../services/User'
export default async function Protected(req, res){
  try{
    const token = await getToken({ req })
    if (token) {
      // Signed in
      let data = await verifyUser(token.sub)
      res.status(200).send({data})

    } else {
      // Not Signed in
      res.status(401)
    }
    res.end()
  }catch(err){
    console.trace(err);
    res.status(500)
    res.end()
  }

}