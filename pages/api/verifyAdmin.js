import {isAdminVerification} from '../../services/Admin'
import {getAllUsers} from '../../services/User'
import { getToken } from "next-auth/jwt"


export default async function verifyAdmin(req, res){
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        res.end()
        return
      }    
    try{
        const {message, signature} = req.body
        const token = await getToken({ req })
        if(message && signature && token){
            const isAdmin = await isAdminVerification(token.sub)
            res.send({data:isAdmin})

        }else{
            res.status(500);
            res.end()    
            return
        }
    }catch(err){
        console.log(err)
        res.status(500);
        res.end()    
        return
    }
}