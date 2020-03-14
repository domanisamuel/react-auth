import React from 'react'
import { useAuth } from '../context/Auth'
import setAuthToken from '../utils/Set-Auth-Token'

function Logout(){
    const { setUser } = useAuth()

    const logoutUser = () => {
        localStorage.removeItem('_token')

        // remove auth Header for future request
        setAuthToken(false)

        // clear current user profile
        setUser(null)
    }

    return (
        <div className='logout'>
            <b onClick={logoutUser}>Logout</b>
        </div>
    )
}

export default Logout