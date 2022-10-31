import Fernet from 'fernet'


function generateToken(address){
    return new Promise((resolve, reject) => {
        try{
            const pk = process.env.SELAS_PRIVATE_KEY
            const secret = new Fernet.Secret(pk);    
            const token = new Fernet.Token({
                secret: secret
              })
              const message = token.encode(address)
              resolve(message)
        }catch(err){
            reject(err)
        }
        
    })
}

export {generateToken}