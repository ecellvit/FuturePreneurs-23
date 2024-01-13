import React, { useEffect, useState } from "react";

export default function InputBoxList() {
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
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="p-2 border border-gray-300 flex-1"
          placeholder="Add a new task"
        />
        <button
          onClick={() => addTodo()}
          className="ml-2 p-2 bg-blue-500 text-white"
        >
          Add
        </button>
      </div>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <span className="mr-2">{todo.task}</span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="p-1 text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
