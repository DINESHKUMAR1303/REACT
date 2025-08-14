import { useReducer } from "react"


function Sample(){
    const counter=(state, action)=>{
        switch(action.type) {   
            case "in":
                return state+1
            case "de":
                return state-action.val
            default:
                return state
    }
    }

    const [count, dispatch] = useReducer(counter,0)
    return (
        <div>
            <h1>Sample Component</h1>
            <p>This is a sample component. {count}</p>
            <button onClick={()=>dispatch({type:"in"})}>increment</button>
            <button onClick={()=>dispatch({type:"de", val:10})}>decrement</button>
        </div>
    );
}
export default Sample;