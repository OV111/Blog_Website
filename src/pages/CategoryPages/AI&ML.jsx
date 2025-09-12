import { useEffect } from "react"

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const AiandML = () => {
    const fetchingPosts = async() => {
        const request = await fetch(`${VITE_API_BASE_URL}/categories/ai&ml`,{
            method: "GET",
            headers: {"Content-Type" :"application/json"}
        })
        const response = await request.json()
        console.log(response)
    }
    useEffect(() => {
        fetchingPosts()

    },[])
    return (
        <h1>AI and Machine Learning</h1>
    )
}
export default AiandML;