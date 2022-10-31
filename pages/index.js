import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {StarOutlined,PictureOutlined, InboxOutlined} from '@ant-design/icons'
import { Image, Row, Col, Typography, Button, Tabs} from "antd"
import { useDispatch, useSelector } from "react-redux";
import { selectUserState, setUserState } from "../context/reducer";
import  {LoadingOutlined} from '@ant-design/icons'
import  {BiLinkExternal} from 'react-icons/bi'
import Router from 'next/router'

import Layout from '../components/general/Layout'
import AccessDenied from "../components/general/access-denied"
import AiImage from '../components/AiImage'
import Gallery from "../components/profile/Gallery"
import FavouritesGallery from "../components/profile/FavouritesGallery"
import PrompCrafter from "../components/prompCrafting/PrompCrafter"


const {TabPane} = Tabs

function Profile(props){
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch();
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [userUpdated, setUserUpdated] = useState(false)
  const [isLoged, setIsLoged] = useState(false)
  const [activeTab, setActiveTab] = useState("new")


  return (

              <div className=" py-5 container-fluid">
              <PrompCrafter/>
              </div>
  )

}

export default Profile
