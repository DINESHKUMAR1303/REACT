import React  from 'react';
import Demo from "./Demo";
import Home from './Home'
import Contact from './Content';
import Context from './Context';
import Sample from './Sample';
import Sample1 from './Sample1';
import Login from "./Login";
import Signup from "./Signup";




function App(){
    let isMounted = "false";
    return (
        <div>

              {/* <Sample/>
              <Home/>
              <Demo res={isMounted}/> 
              <Contact/> 
              <Context/> 
              <Sample1/>*/}

              <Login />
               <hr />
              <Signup /> 
     


        
        </div>
    )
}
export default App;



