// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import SelasImage from "../../models/selasImage.model"
import {updateImageById, verifyImageOwnership} from '../../services/Selas'
import { addImage } from "../../services/User"

export default async function saveImage(req, res){
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
    const image = req.body.image
    console.log(req.body)
    const isOwner = await verifyImageOwnership(image?._id, creator_address)
    if(creator_address && image && isOwner){
        const newImage = await updateImageById(image._id, image)
        const newUser = await addImage(newImage)
        res.status(200).send({data:{image:newImage, user:newUser}})
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