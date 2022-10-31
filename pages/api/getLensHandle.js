import getDefaultProfile from '../../utils/lens/getDefaultProfile'
import { getToken } from "next-auth/jwt"


export default async function getLensHandle(req, res){
    try{
        const token = await getToken({ req })
        if(token){
            const handle = await getDefaultProfile(token.sub);
            res.send({handle})
            res.end()
        }else{
            res.status(401)
            res.end()
        }
    }catch(err){
        console.trace(err)
        res.status(500)
        res.end()
    }
}