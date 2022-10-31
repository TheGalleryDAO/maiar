import Head from 'next/head'
import Header from '../components/general/Header'
import {Row,Col, Typography, List, Button} from 'antd'
import {FaDownload} from 'react-icons/fa'
import Gallery from '../components/profile/Gallery'
import TutorialData from '../components/general/tutorial'
const {Title} = Typography

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>LensAI</title>
        <meta name="description" content="LensAI is a text2Image NFT generator, you can monetize your beautiful AI creations! " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header/>
          <div className="bg-black fullScreen d-flex justify-content-center align-items-center">
              <div className="container">
            <Row justify="space-between" align="middle" gutter={[16,16]}>
                <Col xs={24} sm={24} md={24} lg={10}>
                    <div className="d-flex justify-content-center">
                    <div className="text-center">
                    <h1 className="title glow">
                        LensAI
                    </h1>
                    <h1 className="textGreen mt-2">Write, Create<br/> Mint & Share </h1>  
                    </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={14}>
                    <div className="d-flex justify-content-center p-md-3">
                    <img src="https://tgd-selas-images.s3.eu-west-3.amazonaws.com/image+for+website+TGD/collage.jpg" alt="" className="img-fluid rounded"/>            
                    </div>
                </Col>
            </Row>
            <h1 className="glow mt-5">Powered by:</h1>

            <Row className="my-5" align="middle" justify="center" gutter={[8,8]}>
                <Col>
                    <a href="https://thegallerydao.io">
                        <img src="/assets/logos/8.svg" alt="" className="img-fluid logo"/>
                    </a>
                </Col>
                <Col>
                    <a href="http://scrypr.com/">
                        <img src="/assets/logos/selas.png" alt="" className="img-fluid horizontalLogo"/>
                    </a>
                </Col>
                <Col>
                    <a href="https://lens.xyz">
                        <img src="/assets/logos/lensLogo.png" alt="" className="img-fluid logo"/>
                    </a>
                </Col>                
            </Row>
              </div>
          </div>
          <div>
          </div>
          <Row justify="center">
              
              <Col xs={22} sm={22} md={22} lg={14}>
                <h1 className="mt-5">How does it work?</h1>
                <h5 className="mt-3">
                <b>LensAI</b> is a text2Image NFT generator, you can monetize your beautiful AI creations! 
                </h5>
                <div class="ratio ratio-16x9 mt-5">
                    <iframe src="https://www.youtube.com/embed/ZjtOlVfojVE" title="GalleryDAO x Selas: Prompt Design for AI-art" allowfullscreen></iframe>
                </div>
                <a target="_blank" href="https://tgd-selas-images.s3.eu-west-3.amazonaws.com/image+for+website+TGD/%5BEN%5D+Metaversit%C3%A9+-+Selas+x+TGD+prompt+crafting+Tips.pdf">
                    <Button className="mt-3">Download the Tutorial Slides <FaDownload  className="mx-1"/></Button>
                </a>
                <p className="mt-5">
                With this tool you can create images using AI, think about something you'd like to create, write a detailed description of it and the computer will handle the rest. After some attempts you will obtain a visual representation of your thoughts, now you can publish it on Lens protocol and sell it as an NFT.
                </p>
                <List className="mt-5" header={<b>Some pointers</b>} bordered>
                    <List.Item>
                        Write sentences using natural language. E.g., "A giant robot attacking a train."
                    </List.Item>
                    <List.Item>
                        You should write prompts describing the image you want to create. For instance, do not type "draw a white cat" but "a white cat."
                    </List.Item>
                    <List.Item>
                        Be specific, not just "a cat" but "a cute black cat surfing a gigantic longboard in Hawaii at sunset."
                    </List.Item>
                    <List.Item>
                        If a prompt doesn't work, try to add more details (what we call modifiers: artist's name/art style/photography settings, etc.) Go crazy!
                    </List.Item>
                    <List.Item>
                        Every output is different, even with the same prompt. If you are not yet satisfied with the results, try again!
                    </List.Item>                    
                </List>

                <h2 className="mt-5">Prompt Examples:</h2>
                <div className="my-5">
                    <Gallery showButtons={false} images={TutorialData}/>
                </div>

              </Col>
          </Row>
      </div>
  )
}

