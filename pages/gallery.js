import { CommunityGallery } from '../components/Social/CommunityGallery';
import Layout from '../components/general/Layout';
import {ArrowUpOutlined} from '@ant-design/icons'
import { Button } from 'antd';
export default function Gellery(props){

    return(
        <div>
            <Layout fullScreen={true}>
                <div id="top"></div>
                <Button type="primary" href='#top' icon={<ArrowUpOutlined />} shape="circle" size="large" className="fixed-bottom m-5"></Button>   
                <CommunityGallery/>
            </Layout>
        </div>
    )
}