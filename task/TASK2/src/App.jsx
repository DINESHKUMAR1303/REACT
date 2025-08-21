import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegForm from './RegForm'
import {Link,Route,Routes } from 'react-router-dom'
import Sample from './Sample'
import Demo from './Demo'


function App() {
 

  return (


    <div>
   <h1> component</h1>
   <Link to="/">Home</Link>
   <Link to="/service">Service</Link>
   <Link to="/abb">About</Link>
   <Link to="/con">Contact</Link>



   <Routes>
    <Route path='/' element= { <Sample/>}/>
    <Route path='/service' element= { <Sample/>}/>
    <Route path='/con' element= { <Demo/>}/>
    <Route path='/abb' element= {<RegForm/>}/>
    <Route path='/*' element= { <Demo/>}/>
   </Routes>
  
  </div>
  )
  
}

export default App
