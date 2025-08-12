import React  from 'react';
import Demo from "./Demo";
import Home from './Home'
import Contact from './Content';
import Context from './Context';


function App(){
    let isMounted = "false";
    return (
        <div>

            
{/*             
              <Home/>
              <Demo res={isMounted}/> 
               <Contact/> */}
            <Context/>


        
        </div>
    )
}
export default App;



