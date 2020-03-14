import React, { useState } from 'react'
import './Auth.css'
import Button from '../components/Button/Button'
import Loader from '../components/loader/Loader'

import axios from 'axios'
import { url } from '../utils/config'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/Set-Auth-Token'
import { useAuth } from '../context/Auth'


function Login () {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const { setUser } = useAuth()

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true)
        setError(null)
        
        axios
            .post(`${url}/auth/user/signin`, { email, password })
            .then(res => {
                if(res.status === 200){
                    setLoading(false)
                    const { data: { data } } = res
                    console.log(data)

                    // get token and save to local storage
                    localStorage.setItem('_token', data.token)

                    // set token to auth Header to be sent along every request
                    setAuthToken(data.token)

                    // decode token and set current user
                    const { exp, user_id, phone_verified, email_verified } = jwt_decode(data.token)

                    // set user
                    setUser({ exp, user_id, phone_verified, email_verified })

                    // direct to dashboard
                    window.location.href='/dashboard'

                }
            })
            .catch(err=> {
                setLoading(false)
                if (err) {
                    const { error } = err.response.data;
                    const { code, description } = error[0];
                    if (error) {
                        setError({ code, description })
                    }
                }
            })


    }

    return (
        <div className='login'>
            <h2>Login</h2>
            <p style={{color:'red'}}>{error && `* ${error.description}`}</p>
            
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    required 
                    onChange={(e)=> setEmail(e.target.value)}
                /> <br/>
                <input
                    type='password'
                    placeholder='Password'
                    required 
                    onChange={(e)=> setPassword(e.target.value)}
                /> <br/>
                <Button label={loading ? <Loader/> : 'Login'}/>
            </form>
        </div>
    )
}

export default Login