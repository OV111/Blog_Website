import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../context/useAuthStore'
const LogOut = () => {
    const navigate = useNavigate()
    const {logout} = useAuthStore()
    const handleLogout = () => {
        logout()
        navigate("/get-started")
    }
    return (
        <React.Fragment>
            <button onClick={() => {handleLogout()}} className='bg-red-400 cursor-pointer'>Log Out</button>
        </React.Fragment>
    )
}
export default LogOut;