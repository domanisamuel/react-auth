import React from 'react'
import './Dashboard.css'
import Logout from '../../auth/Logout'

function Dashboard (){
    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <Logout/>
        </div>
    )
}

export default Dashboard