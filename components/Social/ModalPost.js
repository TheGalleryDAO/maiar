import {useEffect, useState} from 'react'
import {Modal, Row, Col, Typography, Avatar} from 'antd'
import MirrorPublication from '../../lens/MirrorPublication'
import CollectPublication from '../../lens/CollectPublication'
import Link from "next/link"
import { useSession } from "next-auth/react"
const {Text, Paragraph} = Typography

export default function ModalPost({post}){
    const { data: session, status } = useSession()

    const [imageLink, setImageLink] = useState(null)
    useEffect(() => {
        const _imageLink =   post?.metadata?.media[0]?.original?.url.replace("ipfs://", "https://lens.infura-ipfs.io/ipfs/")
        setImageLink(_imageLink)
    },[post])

    return(
        <div className='d-flex justify-content-center'>
            {post?(
                    <div className=''>
                        <a target="_blank" href={"https://lenster.xyz/posts/" + post.id}>
                        <img src={imageLink} alt="" className="img-fluid isButton" />
                        </a>
                        <Row justify="space-between" align="middle">

                        {
                            post?.profile?.handle && (
                                <Col>
                                <a target="_blank" href={'https://lenster.xyz/u/' + post?.profile?.handle} className="m-0 text-sm green noLink">
                                    @{post?.profile?.handle}
                                    
                                </a>
                                </Col>
                            )
                        }
                        {session && session.handle && (
                                <Col>
                                    <MirrorPublication postId={post.id}/>
                                </Col>
                        )}
                        </Row>

                    <div className="divider"></div>

                    </div>
            ):"Loading..."}
        </div>
    )
}
