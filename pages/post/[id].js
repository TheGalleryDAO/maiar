import { useRouter } from 'next/router'
import {useState,useEffect} from 'react'
import {Row, Col, Avatar, Button, Message, message, Typography} from 'antd'
import {getPost} from '../../utils/lens/social/getPost'
import Layout from '../../components/general/Layout'
import Link from 'next/link'
import MirrorPublication from '../../lens/MirrorPublication'

const {Text, Paragraph} = Typography

export default function User(props){
    const router = useRouter()
    const {id} = router.query
    const [profile, setProfile] = useState(null)
    const [post, setPost] = useState(null)
    const [profilePic, setProfilePic] = useState(null)
    const [error, setError] = useState(false)
    const [imageLink, setImageLink] = useState(null)
    const init = async () => {
        try{
            const _post = await getPost(id) 
            console.log(_post)
            setPost(_post?.data?.publication)
            const _profilePic =  _post?.data?.publication?.profile?.picture?.original?.url.replace("ipfs://", "https://lens.infura-ipfs.io/ipfs/")
            const _imageLink =   _post?.data?.publication?.metadata?.media[0]?.original?.url.replace("ipfs://", "https://lens.infura-ipfs.io/ipfs/")
            setImageLink(_imageLink)
            setProfilePic(_profilePic)
            setProfile(_post?.data?.publication?.profile)
        }catch(err){
            console.log(err);
            setError(true)
            message.error("Oops something goes wrong!")
        }
    }

    useEffect(() => {
        if(id){
            init()
        }
    },[id])

    return(
        <Layout>
            {post?(
                    <div className='mt-5'>

                    <Row justify="center" align="middle" className=' '>

                        <Col lg={12} md={24}>
                            <div className="text-center">
                            <img src={imageLink} alt="" className="img-fluid " />

                            </div>

                        <div className="">
                                <Row gutter={[16,16]}>
                                    <Col>
                                        <MirrorPublication postId={post?.id} parentCallback={(data) => {console.log(data)}}/>                                    
                                    </Col>
                                    {/* <Col>
                                        <CollectPublication postId={post?.id} parentCallback={(data) => {console.log(data)}}/>                                    
                                    </Col> */}
                                </Row>
                            </div>
                            <div className="mt-3">
                            <Row align='middle' gutter={[8,8]}>
                                {profilePic && (
                                <Col>
                                <Link href={"/user/"+ post?.profile?.handle}>
                                <Avatar
                                className='isButton'
                                size={32}
                                src={profilePic}
                                />
                                </Link>
                                </Col>
                                )}
                                <Col>
                                    <Link href={"/user/" + post?.profile?.handle}>
                                        <p className='text-lg green isButton m-0'>
                                        @{post?.profile?.handle}
                                        </p>   
                                    </Link>
                                </Col>
                            </Row>
                            </div>

                            <div className="mt-3">
                                <Paragraph>
                                    {post?.metadata?.content}
                                </Paragraph>   
                            </div>
                        </Col>
                    </Row>
                    </div>
            ):(
                <div>
                    ERROR
                </div>
            )}
        </Layout>
    )
}