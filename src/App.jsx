import React, { useState, useEffect } from "react";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  useEffect(()=>{
    const json  = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if(loadedTodos){
      setTodos(loadedTodos);
    }
  },[]);
  useEffect(()=>{
    if(todos.length > 0){
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };

    if (newTodo.text.length > 0 ) {
        setTodos([...todos, newTodo]);
    } else {
        alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = "";
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(newTodo) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === newTodo.id) {
        todo.text = document.getElementById(newTodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list" className=" h-screen p-4 bg-gray-500">
      <h1 className="text-3xl font-bold mb-4 flex justify-center items-center">Todo List</h1>
      <form onSubmit={handleSubmit} className=" mb-4">
        <input
          type="text"
          id="todoAdd"
          className="w-1/2 border border-gray-300 p-2 rounded-md mr-2"
          placeholder="Enter todo"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="w-3/4 flex flex-col border p-2 mb-2">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`completed-${todo.id}`}
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className="mr-2"
          />
          <div className="flex-1">
            {todo.id === todoEditing ? (
              <input
                type="text"
                id={todo.id}
                defaultValue={todo.text}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <div className={`break-all ${todo.completed ? "line-through" : ""}`}>
                {todo.text}
              </div>
            )}
          </div>
          <div className="flex space-x-2 ml-4">
            {todo.id === todoEditing ? (
              <button
                onClick={() => submitEdits(todo)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setTodoEditing(todo.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
           
      ))}
    </div>
  );
};

export default App;
