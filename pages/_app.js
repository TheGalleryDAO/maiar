import React, {useState,useEffect} from 'react'

import 'antd/dist/antd.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import Layout from '../components/general/Layout'

function MyApp({ Component, pageProps }) {
  
  return (

    <div>
        <Component {...pageProps} />
    </div>
  )
}

export default MyApp
