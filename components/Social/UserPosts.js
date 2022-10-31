import React,{useEffect, useState} from 'react'
import { message } from 'antd'
import {getPublications} from '../../utils/lens/social/getUserPosts'
export default function UsersPosts(props){
    const [post, setPosts] = useState(null)

    const getData = async () => {
        try{
            const data = await getPublications("0xbedb")
            console.log(data)
        }catch(err){
            console.log(err)
            message.error("Error fetching the user posts")
        }
    }
    useEffect(() => {
        getData()
    },[])
    return(
        <h1>POSTS</h1>
    )
}