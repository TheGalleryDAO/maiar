import createLensPost  from '../../utils/lens/create-post'
import {uploadIpfs} from '../../utils/lens/ipfs'
import {getImageById, setNftgenerated} from '../../services/Selas'
import {updateUserImages} from '../../services/User'
import { getToken } from "next-auth/jwt"


export default async function createPost(req,res){
    try{
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            res.end()
            return
          }
          // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
          const token = await getToken({ req })
          const image = req.body.image

        if(token && image){
            const storedImage = await getImageById(image._id)
            if(storedImage.creator_address == token.sub && storedImage.nft_generated == false){
                const imageUrl = decodeURI(image.img_url)
                const ipfsData = await uploadIpfs(imageUrl, "The AI Image", image.prompt)
                console.log(ipfsData)
                const {postId, txHash} = await createLensPost(ipfsData.path)
                const newImage = await setNftgenerated(image._id, postId,txHash)
                const user  = await updateUserImages(token.sub, newImage)
                console.log(newImage) 
                res.send({data:user})
                res.end()
                return           
            }else{
                console.log(storedImage)
                res.status(401)
                res.end()
                return
            }
        }else{
            console.log(token)
            console.log(image)
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
