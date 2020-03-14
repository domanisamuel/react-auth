import React, { useState, useEffect } from 'react';
import './App.css';
import Preloader from './components/preloader/preloader'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import ErrorPage from './pages/404/404'

//routing
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import jwt_decode from 'jwt-decode'
import { AuthContext } from './context/Auth'
import setAuthToken from './utils/Set-Auth-Token'
import ProtectedRoute from './utils/ProtectedRoutes'

function App() {
  // preloading
  const [ spinner, setSpinner ] = useState(true)

  // auth
  const [ user, setUser ] = useState(null)
  const setCurrentUser = data => {
    setUser(data)
  }

  useEffect(()=> {
    // preloader
    setTimeout(()=> setSpinner(false), 1000)

    // auth
    // check for a token in the local storage
    const token = localStorage.getItem('_token')

    // check for expired token
    const checkForExpiredToken = token => {
      if(token) {
        const { exp } = jwt_decode(token)
        const currentTime = Date.now() / 1000

        if(exp < currentTime){
          // logout user
          localStorage.removeItem('_token')

          // remove auth Header for future requests
          setAuthToken(false)

          // clear current user profile
          setUser(null)

          // redirect to login
          window.location.href = '/'

        }

      }
    }

    if (token) {
      // set token in the request headers of every request
      setAuthToken(token);

      // decode token and set current user
      const { exp, user_id, email_verified, phone_verified } = jwt_decode(token)
      
      setUser({ exp, user_id, email_verified, phone_verified })

      // check for expired tokens
      checkForExpiredToken(token)
    }

    // continously check for expired tokens
    const interval = setInterval(()=> {
      checkForExpiredToken(token)
    }, 1000)
    
    return () => clearInterval(interval)

  }, [])

  if(spinner) {
    return <Preloader/>
  } else {
    return (
      <div className='App'>
        <AuthContext.Provider value={{ user, setUser: setCurrentUser }}>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Home}/>
              <ProtectedRoute path='/dashboard' component={Dashboard}/>
              <Route component={ErrorPage}/>
            </Switch>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    )
  }
}

export default App;
