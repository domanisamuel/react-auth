import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

function ProtectedRoute ({ component: Component, ...rest }){
    const token = localStorage.getItem('_token')
    let email_verified = false
    let phone_verified = false

    if(token){
        const userInfo = jwt_decode(token)
        email_verified = userInfo.email_verified
        phone_verified = userInfo.phone_verified
    }

    return (
        <Route {...rest}
            render = {props => {
                if(!token) return <Redirect to='/'/>
                // if(!email_verified) return <Redirect to='/'/>
                // if(phone_verified) return <Redirect to=''/>
                return <Component {...props} />
            }}
        />
    )

}

export default ProtectedRoute