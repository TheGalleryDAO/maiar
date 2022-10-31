import { create, urlSource} from 'ipfs-http-client';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'


const projectId = process.env.INFURA_IPFS_PROJECT_ID
const projectSecret = process.env.INFURA_IPFS_SECRET
console.log("ID: " + projectId + " SECRET" + projectSecret)
const auth ='Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const generateMetadata =  (ipfsUrl, title, prompt, handle=null) => {
    const metadata = {
        version: '2.0.0',
        metadata_id: uuidv4(),
        description: prompt ,
        content:prompt,
        locale: "en-US",
        tags: ["LensAIhalloweenCompetition","theGalleryDAO", "SELAS Studio", "AIArt", "NFTArt", "AI"],
        mainContentFocus: "IMAGE",
        external_url: "https://thegallerydao.io",
        name: title,
        attributes: [],
        image: "ipfs://" + ipfsUrl,
        imageMimeType: "image/jpeg",
        media: [{
            item: "ipfs://" + ipfsUrl,
            type: "image/jpeg"
        } ],
        appId:process.env.APP_ID
    }
    return metadata
}





export function uploadIpfs (url, title, prompt){
  return new Promise(async (resolve, reject) => {
    const imagePin = await uploadImageToIpfs(url).catch((err) => reject(err));
    if(imagePin && imagePin.cid){
      const imageUri = imagePin.path
      console.log(imageUri)
      const metadata = generateMetadata(imageUri, title, prompt)
      const result = await client.add(JSON.stringify(metadata)).catch((err) => {
        console.trace(err);
        reject("Upload failed")
      });
      if(result && result.cid){
        resolve(result);
        console.log('upload result ipfs', result);
      }
    }
  })
}

export function uploadImageToIpfs(filePath){
  return new Promise(async (resolve, reject) => {
  //https://www.thegallerydao.io/assets/logos/2.svg
  //const data = urlSource(filePath)
  const response = await axios.get(filePath,  { responseType: 'arraybuffer' })
  const buffer = Buffer.from(response.data, "utf-8")
  const result = await client.add(buffer).catch((err) => {
    console.trace(err);
    reject("Infura IPFS File Upload failed")
  })
  resolve(result)
  })

}
