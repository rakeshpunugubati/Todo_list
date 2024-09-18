import React , {useEffect, useState} from 'react'
import TodoInput from './Components/TodoInput'
import TodoList from './Components/TodoList'
import { stringify } from 'postcss';
function App() {
  const [todos, setTodos] = useState([
    'Go to the gym',
    'Eat more furits and vegie',
    'Learn React'
  ]);
  const [todoValue, setTodoValue] = useState('')

  function updateLocalStorage(newtodos){
    localStorage.setItem('todos' , JSON.stringify(newtodos))
  }

  function handleAddTodo(newtodo){
    if(newtodo.trim() !== ''){
      setTodos([...todos, newtodo]);
      updateLocalStorage([...todos, newtodo]);
    }
  }

  function handleDeleteTodo(itemIndex){
    const newtodos = todos.filter( (todo , index) => index !== itemIndex);
    setTodos(newtodos);
    updateLocalStorage(newtodos);
  }

  function handleEditTodo(itemIndex){
    setTodoValue (todos[itemIndex]);
    const newtodos = todos.filter( (todo , index) => index !== itemIndex);
    setTodos(newtodos);
  }

  useEffect(() => {
    let localdata = localStorage.getItem('todos');
    if (localdata) {
      setTodos(JSON.parse(localdata));
    }else{
      localStorage.setItem('todos' , JSON.stringify(todos));
    }
  }, []);
  

  return (
    <>
      <TodoInput todoValue ={todoValue} setTodoValue={setTodoValue} handleAddTodo={handleAddTodo}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos ={todos}/>
    </>
  )
}

export default App