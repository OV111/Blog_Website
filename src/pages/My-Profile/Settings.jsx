import React from 'react'
const Settings = () => {
    console.log("vaeh")
    return (
        <React.Fragment>
            <div>
            <h1>General</h1>
            <div className='grid gap-2'>

            <label htmlFor="">f,l Name</label>
            <input type="text" placeholder='username' className='max-w-100 border-1 ' />

            <label htmlFor="">Bio</label>
            <input type="text" placeholder='bio' className='max-w-100 border-1 ' />

            <label htmlFor="">Links of Github</label>
            <input type="text"  placeholder='Enter New Url' className='max-w-100 border-1 '/>
            <label htmlFor="">Links of Linkedin</label>
            <input type="text" placeholder='Enter New Url' className='max-w-100 border-1 '/>
            <label htmlFor="">Links of Twitter</label>
            <input type="text" placeholder='Enter New Url'className='max-w-100 border-1 '/>
            </div>
            </div>
        </React.Fragment>
    )

}

export default Settings;