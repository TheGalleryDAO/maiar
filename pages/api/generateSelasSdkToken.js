import { getToken } from "next-auth/jwt"
import {createToken} from '../../utils/selasSDK'

export default async function generateSelasToken(req, res){
    try{
        if (req.method !== 'GET') {
            res.status(405).send({ message: 'Only GET requests allowed' })
            return
          }
        const data = await createToken()
        res.send({data})
    }catch(err){
        res.status(500).send({err})
    }
}