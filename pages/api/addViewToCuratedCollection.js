import {addViewToCollection} from '../../services/CuratedCollection'

export default async function whiteListUsersRoute(req, res){
    try{
      if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
      }
      const id = req?.body?.id;
        if(id){
          const collection = await addViewToCollection(id)
          res.send({data:collection})
          res.end()
          return
        }else{
          res.status(500)
          res.end()
          return
        }
    }catch(err){
        res.status(500)
        res.end()
        return
    }
}
