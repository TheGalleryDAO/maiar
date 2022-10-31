import axios from 'axios';
const fs = require('fs');
const FormData = require('form-data');
const pinAPI = "https://api.pinata.cloud/pinning"
import { v4 as uuidv4 } from 'uuid';

const generateMetadata =  (ipfsUrl, title, prompt) => {
    const metadata = {
        version: '2.0.0',
        metadata_id: uuidv4(),
        description: `AI generate image using the SELAS text to image engine. Learn more at https://thegallerydao.io. Prompt used: ${prompt}` ,
        content:`AI generate image using the SELAS text to image engine. Learn more at https://thegallerydao.io. Prompt used: ${prompt}`,
        locale: "en-US",
        tags: ["theGalleryDAO", "SELAS Studio", "AIArt", "NFTArt", "AI"],
        mainContentFocus: "IMAGE",
        external_url: "https://thegallerydao.io",
        name: title,
        attributes: [],
        image: "ipfs://" + ipfsUrl,
        imageMimeType: "image/png",
        media: [{
            item: "ipfs://" + ipfsUrl,
            type: "image/png"
        } ]
    }
    return metadata
}

function testAuthentication(){
    return new Promise(async (resolve,reject) => {
        const url = 'https://api.pinata.cloud/data/testAuthentication';
        const response = await  axios.get(url, {
                headers: {
                    'pinata_api_key': process.env.PINATA_API_KEY,
                    'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
                }
            }).catch((err) => {
                console.trace(err);
                reject("The pinata authentication has failed")
            })
            if(response && response.data) resolve(response.data)

    })
}

function pinFileToIPFS(filePath){
    return new Promise(async (resolve, reject) => {
        let data = new FormData();
        data.append('file', fs.createReadStream(filePath));
        data.append('pinataOptions', '{"cidVersion": 1}');
        data.append('pinataMetadata', '{"name": "test", "keyvalues": {"company": "Pinata"}}');
    const response = await axios.post(pinAPI + '/pinFileToIPFS',
            data,
            {
                headers: {
                    "Authorization": `Bearer ${process.env.PINATA_SECRET_TOKEN}`,
                    ...data.getHeaders()
                }
            }
        ).catch((err) => {
            console.trace(err);
            reject("The pinata file upload has failed")
        });
        if(response && response.data) resolve(response.data)
    })

}

function pinJsonToIPFS(data){
    return new Promise(async (resolve, reject) => {
        const url = `${pinAPI}/pinJSONToIPFS`
        const pinataData = JSON.stringify({
            "pinataOptions": {
                "cidVersion": 1
              },
              pinataMetadata: {
                name: `lensPost-${data.metadata_id}`,
            },
              "pinataContent":{
                  ...data
              }
              
        });
        const config = {
            method:'post',
            url:url,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.PINATA_SECRET_TOKEN}`,

            },  
            data:pinataData
        }   
        const response = await axios(config).catch((err) => {
            console.trace(err);
            reject("The pinata json upload has failed");
        })
        if(response && response.data) resolve(response.data)
    })
}
function uploadContentToIPFS(imagePath, title, prompt){
    return new Promise(async (resolve,reject) => {
        try{
            const imageResponse = await pinFileToIPFS(imagePath).catch((err) => {
                console.trace(err);
                reject("Image pinning failed")
            });
            if(imageResponse && imageResponse.IpfsHash){
                const metadata = generateMetadata(imageResponse.IpfsHash,title, prompt);
                const metadataResponse = await pinJsonToIPFS(metadata).catch((err) => {
                    console.trace(err);
                    reject("Metadata pinning failed")
                });;
                if(metadataResponse){
                    resolve(metadataResponse)
                }
            }
        }catch(err){
            console.trace(err)
            reject("The content upload to IPFS has failed.")
        }
    })
}
export {
    testAuthentication, 
    pinFileToIPFS, 
    pinJsonToIPFS,
    uploadContentToIPFS
}