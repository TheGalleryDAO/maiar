import {generateToken} from '../../utils/selasToken'
import { getToken } from "next-auth/jwt"


export default async function generateSelasToken(req, res){
    try{
        if (req.method !== 'GET') {
            res.status(405).send({ message: 'Only GET requests allowed' })
            return
          }
        const token = await getToken({ req })        
        const data = await generateToken(token.sub)
        res.send({data})
    }catch(err){
        res.status(500).send({err})
    }
}