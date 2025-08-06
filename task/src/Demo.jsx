import { use, useEffect } from "react";


const Demo = (props) => {
// useEffect(callback function, dependency list)
    useEffect(() => {
        console.log("Demo component mounted"); 
    });

  return (
    <div>
      <h1>Demo Component {props.res}</h1>
      <p>This is a simple demonstration of a React component.</p>
      
      
    </div>
  );
}
export default Demo;