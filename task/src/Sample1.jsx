import React, { useReducer, useState } from "react";
import "./Sample1.css";
import { FaCheck, FaTrash } from "react-icons/fa";

const initialTasks = [
  {
    id: 1,
    name: "Alice Mayer",
    task: "Call Sam For payments",
    priority: "High",
    img: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Kate Moss",
    task: "Make payment to Bluedart",
    priority: "Low",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Danny McChain",
    task: "Office rent",
    priority: "Middle",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 4,
    name: "Alexa Chung",
    task: "Office grocery shopping",
    priority: "High",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_COMPLETE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
}

export default function Sample1() {
  const [tasks, dispatch] = useReducer(reducer, initialTasks);
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Low");

  const addTask = () => {
    if (name && task) {
      dispatch({
        type: "ADD",
        payload: {
          id: Date.now(),
          name,
          task,
          priority,
          img: "https://randomuser.me/api/portraits/men/5.jpg"
        }
      });
      setName("");
      setTask("");
      setPriority("Low");
    }
  };

  return (
    <div className="task-container">
      <h2><FaCheck className="title-icon" /> Task List</h2>

      <table>
        <thead>
          <tr>
            <th>Team Member</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td className="member">
                <img src={t.img} alt={t.name} />
                <span>{t.name}</span>
              </td>
              <td>{t.task}</td>
              <td>
                <span className={`priority ${t.priority.toLowerCase()}`}>
                  {t.priority} priority
                </span>
              </td>
              <td className="actions">
                <FaCheck
                  className="check"
                  onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload: t.id })}
                />
                <FaTrash
                  className="delete"
                  onClick={() => dispatch({ type: "DELETE", payload: t.id })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <div className="form">
        <input 
          type="text"
          placeholder=" Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input  
        type="text"
          placeholder=" Task"
          value={task}  
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Middle">Middle</option>  
          <option value="High">High</option>
        </select>
    
      </div>

      <div className="buttons">
        <button className="cancel">cancel</button>
        <button className="add" onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
} 