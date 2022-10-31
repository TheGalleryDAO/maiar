// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import {removeImageByJobId} from '../../services/Selas'

export default async function removeImage(req, res){
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
      res.end()
      return
    }
    // Signed in
    const creator_address = token.sub
    const jobId = req.body.jobId
    if(creator_address && jobId){
        const deletedImage = await removeImageByJobId(creator_address, jobId)
        res.status(200).send({data:deletedImage})
        res.end()
        return
    }else{
        res.status(500)
        res.end()
        return
    }
  }catch(err){
    console.log(err)
    res.status(500)
    res.end()
    return
  }

}