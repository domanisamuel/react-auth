import React, { useState, useEffect } from 'react';
import './App.css';
import Preloader from './components/preloader/preloader'
import Home from './pages/Home/Home';
import ErrorPage from './pages/404/404'

//routing
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  // preloading
  const [ spinner, setSpinner ] = useState(true)
  useEffect(()=> {
    setTimeout(()=> setSpinner(false), 1000)
  }, [])
  if(spinner) {
    return <Preloader/>
  } else {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route component={ErrorPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
