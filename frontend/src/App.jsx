import React from "react";
import { useState } from "react";
import axios from "axios";


const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos , setTodos] = useState([]);

  const addTodo = async(e)=>{
    e.prevent.default();
    if(!newTodo.trim()) return;
    try {
      const  response = await axios.post("api/todos", {text:newTodo})
      setTodos = ([...todos, response.data])
      setNewTodo('');
    } catch (error) {
      console.log("error adding todos", error);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from gray-50 to-gray-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shodow-2xl w-full max-w-lg  p-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8 ">
            Task manager
          </h1>
        </div>
        <form onSubmit={addTodo} className="flex  items-center gap-1 shadow-sm border border-gray-200 p-2 rounded-2xl" >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 "
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter todo "
            required
          />
          <button type="submit " className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer" > Add  Task</button>
        </form>
      </div>
    </div>
  );
};

export default App;
