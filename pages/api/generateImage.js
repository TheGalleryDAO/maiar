// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import {requestNewImageForUser} from '../../services/User'

export default async function GenerateImage(req, res){
  try{
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
    const token = await getToken({ req })
    if (!token) {
      // Not Signed in
      res.status(401)
    }
    // Signed in
    const address = token.sub
    const prompt  = req.body.prompt
    const job_id = req.body.job_id
    const data = await requestNewImageForUser(address, prompt, job_id)
    res.status(200).send({data:data})
    res.end()
  }catch(err){
    console.log(err)
    res.status(500)
    res.end()
  }

}