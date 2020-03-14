import React from 'react'
import './Login.css'
import Button from '../../components/Button/Button'

function Login () {
    return (
        <div className='login'>
            <h2>Login</h2>
            <form>
                <input type='email' placeholder='Email' required /> <br/>
                <input type='password' placeholder='Password' required /> <br/>
                <Button label='Login'/>
            </form>
        </div>
    )
}

export default Login