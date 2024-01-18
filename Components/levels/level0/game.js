import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { newspaper } from "@/constants/newspaper.json"; 
import time from "@/constants/time.json";

export default function Game({set}) {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const newspaper = {
    "1":"https://utfs.io/f/341b21ed-f487-4308-a55c-3ecb1edbf5bb-xraikq.pdf",
    "2":"https://utfs.io/f/7c46982b-507d-4234-a9da-b0988a31c231-z4yujb.pdf",
    "3":"https://utfs.io/f/7c46982b-507d-4234-a9da-b0988a31c231-z4yujb.pdf"
  } 

  console.log('asssssssssss', newspaper, time);

  const newspaperLink = newspaper[set.toString()];

  const sendData = ()=>{
    // send data to backend
    setLoading(true);
    fetch("/api/levels/level0/sendData",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
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
      <Navbar sendData={()=>sendData()} teamName={"Team 1"} level="level0"/>
      <div className="flex h-full"
      style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}
      >
        <div className="flex w-3/5 h-full">
          <iframe className="h-[80vh] w-full m-2 no-scrollbar" src={newspaperLink} frameborder="0"></iframe>
        </div>
        <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4 text-white">Enter Your Answers</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <div className="mr-2 p-2 bg-white border border-gray-300 min-w-20 text-wrap h-fit">{todo.task}</div>
            <button
              onClick={() => removeTodo(todo.id)}
              className="h-6"
            >
              <FaTrash className="text-white" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex mb-4 w-full">
        <textarea
          type="text"
          value={task}
          rows={4}
          onChange={(e) => setTask(e.target.value)}
          className="p-2 border bg-[#E9FFFF] border-gray-300 rounded-lg w-full h-full"
          placeholder="Enter your Answers Here"
        />
        <button
          onClick={() => addTodo()}
          className=""
        >
          <FaPlus className="h-6 w-6 text-white m-2"/>
        </button>
      </div>
      <button className="text-white" onClick={()=>{sendData()}}>SUBMIT</button>
      <Toaster/>
  
    </div>
        {/* <InputBoxList /> */}
      </div>
    </main>
  );
}
