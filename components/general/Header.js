import { signIn, signOut, useSession } from "next-auth/react"
import {useEffect, useState} from 'react'
import Link from "next/link"
import {FaPaintBrush} from 'react-icons/fa'
import {Button, Row, Col, Modal} from 'antd'
import Login from '../Social/Login'
// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const [isLensLoged,setIsLensLoged] = useState(false)
  const [isVisible,setIsVisible] = useState(false)

  useEffect(() => {
    const lenstToken = localStorage.getItem("LensToken")
    setIsLensLoged(lenstToken && lenstToken !== "")
  },[session])
  const logOutLens = () => {
    localStorage.setItem("LensToken", "")
  }
  useEffect(() => {
    setIsVisible(false)
  },[isLensLoged])
  return (
    <header className="bg-black">
      <Modal visible={isVisible} onCancel={() => setIsVisible(false)} footer={null} width={1000}>
      <Login parentCallback={(data) => setIsLensLoged(data)}/>              

      </Modal>
      <div className={"container-fluid py-3"}>
        <Row gutter={[16,16]} align="middle" justify="space-between">
          <Col>
          <Link className="isButton" href="/landing">
            <h1 className="glow isButton">LensAI</h1>
          </Link>
          </Col>
          <Col>
          <Link href="/gallery">
            <b className=" isButton glow">Community Gallery</b>
          </Link>
          </Col>
          <Col>
          <Row gutter={[16,16]} justify="end">

          {!session && (
            <Col>
                <Button href="/login" shape="round" size="small" type="primary">Connect Wallet</Button>                          
            </Col>
          )}
          
          {session && session.handle && !isLensLoged && (
            <Col>
            <Button onClick={() => setIsVisible(true)} shape="round" size="small" type="primary">
                Connect to Lens
            </Button>  
            </Col>
            
          )}

          {session && session.user && session.user.address &&(
            <>
              <Col>
              <Link href="/">             
                <Button shape="round" size="small" type="primary">
                  Create
                </Button>
              </Link>
              </Col>
              <Col>
              <Link href="https://thegallerydao.canny.io/lensai/">             
                <Button shape="round" size="small" type="primary">
                  Feedback & Issues
                </Button>
              </Link>
              </Col>
              <Col>
              <Button
              type="primary"
              danger
              shape="round"
              size="small"
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  logOutLens()
                  signOut()
                }}
              >
                Sign out
              </Button>
              </Col>
              </>
          )
        }
        </Row>

          </Col>
        </Row>

      </div>
    </header>
  )
}

/* <div class="container">
<ul class="nav p-3 justify-content-end container-fluid">
    <li class="nav-item">
      <a class="nav-link text-white" aria-current="page" href="https://twitter.com/thegallerydao">
        <i class="bi bi-twitter"></i>
      </a>
    </li>                                      
</ul>
</div>     */