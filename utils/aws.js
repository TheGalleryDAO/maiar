import axios from 'axios'
import S3 from 'aws-sdk/clients/S3'

const s3 = new S3({
    region:"",
    accessKeyId:"",
    secretAccessKey:"",
    signatureVersion:"v4"
})


function aws(file){
    return new Promise(async (resolve, reject) => { 
        const fileParams = {
            Bucket:"",
            Key:"",
            Expires: 600,
            contentType:""
        }
        const url = await s3.getSignedUrlPromise("putObject", fileParams);
        const response = await axios.put(url, file, {
            headers:{
                "Content-type": String(file.type)
            }
        }).catch((err) => {
            console.trace(err)
            reject("Internal server error.")
        })
    })
}