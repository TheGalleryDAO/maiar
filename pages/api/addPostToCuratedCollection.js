import {isAdminVerification} from '../../services/Admin'
import {addPostToCollection} from '../../services/CuratedCollection'
import { getToken } from "next-auth/jwt"

export default async function whiteListUsersRoute(req, res){
    try{
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
          }
          const token = await getToken({ req })
          const data = req?.body?.data;
          const id = req?.body?.id
          const isAdmin = await isAdminVerification(token.sub)
          if(isAdmin && id && data){
            const collection = await addPostToCollection(id,token.sub, data)
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
