import React,{lazy,Suspense,useEffect,useState} from 'react'

const DevOps = () => {
    const [loading,setLoading] = useState(true)
    useEffect(() => {

    },[])

    return (
        <React.Fragment>
            <h1>DevopS Posts</h1>
            <div>
                <Suspense fallback={}>
        {loading?  (
            <></>
        ) : (
            
        )}
                </Suspense>
            </div>
        </React.Fragment>
    )
}
export default DevOps;