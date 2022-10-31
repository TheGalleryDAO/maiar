import {isAdminVerification,followUsers} from '../../services/Admin'

import { getToken } from "next-auth/jwt"

export default async function followUsersRoute(req, res){
    try{
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
          }
          const token = await getToken({ req })
          const handles = req.body.handles;
          const isAdmin = await isAdminVerification(token.sub)
          if(isAdmin && handles){
            const errors = await followUsers(handles)
            console.log(errors)
            res.send({data:errors})
            res.end()
            return
          }else{
              res.status(401)
              res.end()
              return
            }
    }catch(err){
        console.trace(err)
        res.status(500)
        res.end()
        return
    }
}
