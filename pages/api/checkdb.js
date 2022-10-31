import connectMongo from '../../utils/connectMongoose'
import SelasUserModel from '../../models/selasUser.model'
import getDefaultProfile from '../../utils/lens/getDefaultProfile'
import {getUserFavouriteImages, getUserImages,getUserMintedImages} from '../../services/User'
export default async function checkdb(req, res){
    try{
        // await connectMongo();
        // const data = await SelasUserModel.findOne({address:"0xB740257c15bABb2b4F002Bf884b13C7aC648Be60"})
        // const minted = await getUserMintedImages(data.address)
        // const favourites = await getUserFavouriteImages(data.address)
        // const images = await getUserImages(data.address)
        // data.generatedImages = images;
        // data.favouriteImages = favourites;
        // data.mintedImages = minted;
        // await data.save()
        // // const profile = await getDefaultProfile("0xB740257c15bABb2b4F002Bf884b13C7aC648Be60");
        console.log(req?.headers)
        res.send({data:data}) 
        res.end()
        return
        
    }catch(err){
    console.trace(err)
    res.send({error:err})
    res.end()
    return
    }
}

