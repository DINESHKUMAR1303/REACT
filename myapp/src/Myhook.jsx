import { useState } from "react";
import Demo from "./Demo";


    function Myhook(props) {
        const [data, setData] = useState("Hello, World!");
        const [datas, setsData] = useState([
            { id: 1, name: "John" },
            { id: 2, name: "Jane" },
            { id: 3, name: "Doe" }
        ]);
  
        return (
            <div>
                <h1>My Custom Hook Example{data}</h1>
                <p>This is a simple example of a custom hook in React.{props.do}</p>
                <button onClick={() => setData("Hello, React!")}>Change Data</button>
                {datas.map(item => <Demo do={item.name} key={item.id} />)}              
            </div>
        );
    }
    export default Myhook;