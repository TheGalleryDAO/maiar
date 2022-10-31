// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase-admin/app';
import admin from "firebase-admin";

import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const authData = {
  type:process.env.firebase_type,
  project_id:process.env.firebase_project_id,
  private_key_id:process.env.firebase_private_key_id,
  private_key:process.env.firebase_private_key,
  client_email:process.env.firebase_client_email,
  client_id:process.env.firebase_client_id,
  auth_uri:process.env.firebase_auth_uri,
  token_uri:process.env.firebase_token_uri,
  auth_provider_x509_cert_url:process.env.firebase_auth_provider_x509_cert_url,
  client_x509_cert_url:process.env.firebase_client_x509_cert_url,
}
const firebaseConfig = {
  credentials:authData,
  databaseURL:"https://the-gallery-dao-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = admin.apps.length === 0 ? initializeApp(firebaseConfig):admin.app()
console.log(app)
const db = getDatabase(app)
const test = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await getDocs(collection(db, 'test'))
            resolve(response)
            
          } catch (err) {
              console.log(err)
            reject(err)
          }
    })
}
export {db, test}