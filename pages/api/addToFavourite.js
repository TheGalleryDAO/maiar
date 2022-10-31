import {updateUserFavouriteImages, updateUserImages} from '../../services/User'
import {likeImage, getImageById} from '../../services/Selas'
import { getToken } from "next-auth/jwt"


export default async function addToFavourite(req, res){
    try{
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
          }
        const token = await getToken({req})
        if(token){
            const image = req.body.image
            const storedImage = await getImageById(image._id)
            if(storedImage.creator_address == token.sub){
                const newImage = await likeImage(image._id, image.liked);
                const user = await updateUserFavouriteImages(token.sub, newImage)
                res.send({data:user})
                res.end()
                return 
            }else{
                res.status(401)
                res.end()
                return 
            }
        }else{
            res.status(401)
            res.end()
            return
        }
    }catch(err){ 
        console.trace(err)
        reject("Internal server error.")
        res.status(500);
        res.end()
        return
    }
}