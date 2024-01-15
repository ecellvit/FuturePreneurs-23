import Navbar from "../Navbar";
import InputBoxList from "./InputBoxList";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import LoadingIcons from "react-loading-icons";


export default function Game() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const sendData = ()=>{
    // send data to backend
    setLoading(true);
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
      toast.error("Something went wrong");
      setLoading(false);
    })

  }
  

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
    <main className="min-h-screen bg-neutral-800">
      <Navbar sendData={sendData} level="level0"/>
      <div className="flex h-full">
        <div className="flex w-3/5 h-full">
          <iframe className="h-[80vh] w-full m-2 no-scrollbar" src="https://utfs.io/f/70759f63-63e2-41b8-ab97-87e023d0cda5-rcqfzh.pdf#toolbar=0&navpanes=0" frameborder="0"></iframe>
        </div>
        <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Enter Your Answers</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <div className="mr-2 p-2 bg-white border border-gray-300 min-w-full text-wrap">{todo.task}</div>
            <button
              onClick={() => removeTodo(todo.id)}
              className="h-6"
            >
              <FaTrash className="text-white" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex mb-4">
        <textarea
          type="text"
          value={task}
          rows={4}
          onChange={(e) => setTask(e.target.value)}
          className="p-2 border bg-[#E9FFFF] border-gray-300 rounded-lg w-full"
          placeholder="Enter your Answers Here"
        />
        <button
          onClick={() => addTodo()}
          className=""
        >
          <FaPlus className="h-6 w-6 text-white m-2"/>
        </button>
      </div>
      <button className="text-white border border-white rounded-xl p-2" disabled={loading} onClick={()=>{sendData()}}>
        {loading?<LoadingIcons.ThreeDots className="h-6 w-6"/>:"Submit"}
      </button>
      <Toaster/>
  
    </div>
        {/* <InputBoxList /> */}
      </div>
    </main>
  );
}
