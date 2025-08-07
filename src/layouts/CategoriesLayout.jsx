import React from 'react'
import {Outlet} from "react-router-dom"
import CategoryNavbar from '../components/CategoryNavbar'
import Footer from '../components/Footer'
const CategoryLayout = () => {
    return (
        <React.Fragment>
            <CategoryNavbar />
            <div>
                <Outlet />
            </div>
            <Footer /> 
        </React.Fragment>
    )
}
export default CategoryLayout