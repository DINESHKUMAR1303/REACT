import React  from 'react';
import Demo from "./Demo";
import Home from './Home'



function App(){
    let isMounted = "false";
    return (
        <div>
            
              <Home/>
              <Demo res={isMounted}/>
              
            
              

        
        </div>
    )
}
export default App;



