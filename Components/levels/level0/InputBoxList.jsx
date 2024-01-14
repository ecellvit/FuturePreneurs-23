import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";

export default function InputBoxList() {
  const sendData = ()=>{
    // send data to backend
    fetch("/api/levels/level0/sendData",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({answers:todos.length})
      
    })
    .then(res=>{
      if(res.status === 200){
        toast.success("Submitted successfully.")
      };
    })
    .then(data=>{
      console.log(data);
      location.reload();
    })
    .catch(err=>{
      toast.error("Something went wrong")
    })

  }
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos).todos);
    }
  }, []);

  const addTodo = () => {
    if (todos !== "") {
      if (task.trim() !== "") {
        const curTodos = [...todos, { id: todos.length + 1, task }];
        localStorage.setItem("todos", JSON.stringify({ todos: curTodos }));

        setTodos(curTodos);
        setTask("");
      }
    }
  };

  const removeTodo = (id) => {
    const curTodos = todos.filter((todo) => todo.id !== id);
    setTodos(curTodos);
    localStorage.setItem("todos", JSON.stringify({ todos: curTodos }));
  };
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Enter Your Answers</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <div className="mr-2 p-2 bg-white border border-gray-300 flex-1">{todo.task}</div>
            <button
              onClick={() => removeTodo(todo.id)}
              className="h-6"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="p-2 border border-gray-300 flex-1"
          placeholder="Enter your Answers Here"
        />
        <button
          onClick={() => addTodo()}
          className=""
        >
          <FaPlus className="h-6 w-6"/>
        </button>
      </div>
      <button onClick={()=>{sendData()}}>SUBMIT</button>
      <Toaster/>
    </div>
  );
}
