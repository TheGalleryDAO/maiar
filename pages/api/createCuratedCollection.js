import {isAdminVerification} from '../../services/Admin'
import {createCollection} from '../../services/CuratedCollection'
import { getToken } from "next-auth/jwt"

export default async function whiteListUsersRoute(req, res){
    try{
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
          }
          const token = await getToken({ req })
          const name = req?.body?.name;
          const isAdmin = await isAdminVerification(token.sub)
          if(isAdmin && name){
            const collection = await createCollection(token.sub, name)
            res.send({data:collection})
            res.end()
            return
          }else{
              res.status(401)
              res.end()
              return
            }
    }catch(err){
        res.status(500)
        res.end()
        return
    }
}
