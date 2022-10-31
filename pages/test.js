import React,{useEffect, useCallback, useState} from 'react'
import Login from '../components/Social/Login'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {generateToken} from '../utils/selasToken'
import GenerateImage from '../components/prompCrafting/GenerateImage';
import UserPosts from '../components/Social/UserPosts'
import CreatePublication from '../lens/CreatePublication';
import SelasSDKImageGenerator from '../components/prompCrafting/SelasSDKImageGenerator';
import { CommunityGallery } from '../components/Social/CommunityGallery';
//import SelasSDKImageGenerator from '../components/prompCrafting/SelasSDKImageGenerator';
export default function Tests(props){
    const testData = {
        "_id": "633cb17af8babb597af95851",
        "img_url": "https://firebasestorage.googleapis.com/v0/b/scrypr.appspot.com/o/images%2F76bf2054-ccc5-4a1d-8b4f-bd7e43f2bb2a.jpg?alt=media",
        "prompt": "a goat with sunglasses with a colorful background, a poster by Petros Afshar, behance contest winner, fauvism, tarot card, fauvism, behance hd",
        "created_at": "2022-10-04T22:16:38.098Z",
        "version": 0,
        "result_rate": -1,
        "creator_address": "0x9967eF421C613B970424d2B3ce124D3490CF21b7",
        "lenster_post_link": "",
        "nft_metadata": "",
        "job_id": "5d930a7f-80d0-4dff-bb79-39826712bc3a",
        "nft_generated": false,
        "liked": false,
        "txId": "",
        "postId": "",
        "__v": 0
      }
    return(
        <div>
            {/* <Login parentCallback={(e) => console.log(e)}></Login>
            <CreatePublication image={testData}></CreatePublication>
            <SelasSDKImageGenerator prompt={"a cute cat"}/> */}
            <CommunityGallery/>
        </div>
    )
}