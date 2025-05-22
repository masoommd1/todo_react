import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDone } from "react-icons/md";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("api/todos", { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("error adding todos", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("error fetching todos", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async(id)=>{
    try {
      const response = await axios.patch(`/api/todos/${id}`,{text:editedText});
        setTodos(todos.map((todo) => ( todo._id === id ? response.data: todo

        )));
        setEditingTodo(null)
    } catch (error) {
      console.log("error updating todo",error);
    }
  }
  const deleteTodo = async(id)=>{
    try {
      const response = await axios.delete(`/api/todos/${id}`,)
      setTodos(todos.filter((todo)=> todo._id !==id))
    } catch (error) {
      console.log("error deleting todo",error);
    }
  }

  const toggleTodo = async(id)=>{
    try {
      const todo = todos.find((t)=> t._id === id)
      const response = await axios.patch(`/api/todos/${id}`,{
          completed : !todo.completed
      })
          setTodos(todos.map((t) => t._id === id ? response.data : t))
        
    } catch (error) {
      console.log("error toggling todo",error);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from gray-50 to-gray-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shodow-2xl w-full max-w-lg  p-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Task Manager
          </h1>
        </div>
        <form
          onSubmit={addTodo}
          className="flex  items-center gap-1 shadow-sm border border-gray-200 p-2 rounded-2xl"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 "
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter todo "
            required
          />
          <button
            type="submit "
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            {" "}
            Add Task
          </button>
        </form>
        <div className="mt-4">
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div key={todo._id}>
                  {editingTodo === todo._id ? (
                    <div className="flex item--center gap-x-3">
                      <input
                        className="p-3 border border-gray-200 flex-1 rounded-lg outline-none 
                        focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        <button className="px-4 py-2 bg-green-400 text-white rounded-lg cursor-pointer hover:bg-green-600" 
                        onClick={()=>saveEdit(todo._id)}> 
                          <MdDone />
                        </button>
                        <button onClick={() => setEditingTodo(todo)}
                          className="px-4 py-2 bg-red-400 text-white rounded-lg cursor-pointer hover:bg-red-600">
                          <IoIosCloseCircle />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between" > 
                       <div className="flex items-center gap-x-4 overflow-hidden ">
                         <button onClick={()=> toggleTodo(todo._id)} 
                         className={`flex-shrink-0 h-6 w-6 rounded-full border flex items-center justify-center ${
                          todo.completed
                          ?"bg-green-500 border-green-500"
                          :"border-gray-300 hover:border-blue-400"
                         }`}>
                          {todo.completed && <MdDone/>}</button>


                          <span className="text-gray-800 font-medium truncate" >{todo.text}</span>
                       </div>
                          <div className="flex gap-x-2">  
                            <button className="p-2 text-blue-400 hover:text-blue-600 rounded-lg hover:text-blue-50 duration-200 " 
                            onClick={()=> startEditing(todo)}>
                          <MdModeEditOutline />
                        </button>
                        <button onClick={()=> deleteTodo(todo._id)}
                        className="px-5 py-3  text-red-400 hover:text-red-600 rounded-lg hover:text-red-50 duration-200 ">
                          <MdDelete />
                        </button>
                          </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
