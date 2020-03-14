import React from 'react'
import './Home.css'
import Login from '../../components/login/Login'

function Home () {
    return (
        <div className='home'>
            <h1>React Auth</h1>
            <Login/>
        </div>
    )
}

export default Home