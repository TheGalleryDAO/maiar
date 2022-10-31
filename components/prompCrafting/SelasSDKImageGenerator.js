import React,{useState, useEffect} from 'react'
//import {} from 'selas'
import {Button, Alert, message, Row, Col} from 'antd'
import {createSelasClient} from 'selas'
//import {} from '@ant-design/icons' 
import {BsBrushFill} from 'react-icons/bs'

import axios from 'axios'
export default function SelasSDKImageGenerator({prompt, preset, parentCallback}){

    const [error, setError] = useState(false)
    const [jobId, setJobId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [finalPrompt, setFinalPrompt] = useState(null)
    const client = createSelasClient()

    const setDefaults = async () => {
        setJobId(null)
        setLoading(false)
    }


    const whenJobIsDone = async (results) => {
        try{
            if(results?.new?.uri){
               await parentCallback({
                img_url:results?.new?.uri,
                prompt:finalPrompt

               })
               setLoading(false)
            
            
            }else{
                console.log("Error", results?.new?.uri, image?.job_id)
                setDefaults()
                parentCallback(null)
                setError(true)
            }
        }catch(err){
            setDefaults()
            parentCallback(null)
            console.log(err)
            setError(true)
        }
      };
    const createImage = async (e) => {
        e.preventDefault()
        if(!loading){
            setLoading(true)
            const response  = await axios.get("/api/generateSelasSdkToken")
            const key  = response?.data?.data?.key
            console.log(key)
            if(key && finalPrompt){
                const {data: job, message, error } = await client.runStableDiffusion(finalPrompt, 512, 512, 50, 7.5,"k_lms",1, "jpg",key);
                // subscribe to job updates
                console.log(error)
                await client.subscribeToResults(job.id, whenJobIsDone)
                // await client.supabase.from("jobs").on("UPDATE", (payload) => {
                //   if(payload.new.status === "completed" && payload.new.id === job.id) {
                //     whenJobIsDone(payload);
                //   }
                //   if (payload.new.status === "failed") {
                //     setError(true);
                //     parentCallback(null)
                //   }
                   
                //   }).subscribe();
            }
        }
    }
    useEffect(() => {
       const _finalPrompt = preset?(preset.replace("%SUBJECT%", prompt)):prompt
       setFinalPrompt(_finalPrompt)
    },[prompt, preset])
    //
    return(
        <div>
        <Button 
                onClick={createImage}
                loading={loading}
                disabled={error || !finalPrompt || loading}
                size="large"
                type="primary"
            >
                <BsBrushFill/>
                <span></span>
                {loading?"Loading...":"Generate"}
            </Button>  

        {
            error && (
                <Alert type="error" message="Oops, something goes wrong. Please reload the page"></Alert>
            )
        }
        </div>

    )

}


