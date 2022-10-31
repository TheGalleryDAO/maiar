import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Header from '../../components/general/Header'
import AccessDenied from "../../components/general/access-denied"
import PrompCrafter from '../../components/prompCrafting/PrompCrafter'
export default function ProtectedPage(props) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [isLoged, setIsLoged] = useState(false)
  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/protected").catch((err) => {
        console.log(err)
        setIsLoged(false)
      })
      if(res && res.ok){
        setIsLoged(true)
      }else{
          window.location.href = "/"

        }
    }
    fetchData()
  }, [session])



  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null


  // If session exists, display content
  return (
    !isLoged?(
      <div>
        <AccessDenied />
      </div>
    ):(
      <div className="">
              <Header/>
<PrompCrafter></PrompCrafter>

        {/* <button className="btn btn-outline-light" onClick={(e) => createImage(e)}>
          Generate Image
        </button> */}
      </div>
    )

  )
}