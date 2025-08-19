import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
const SignIn = () => {
    const {isAuthenticated} = useContext(AuthContext)

    return (
        <React.Fragment>
            <form className=''>
                <input type="text" placeholder='Enter Your UserName' />
                <input type="password" placeholder='Enter Your Password' />
                {/* <input type="text" /> */}
            </form>
        </React.Fragment>
    )

}
export default SignIn