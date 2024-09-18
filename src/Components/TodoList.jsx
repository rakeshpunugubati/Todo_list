import React from 'react'
import TodoCard from './TodoCard'

function TodoList(props) {
  const {todos} = props;
    
  return (
    <ul className='main'>
        {
            todos.map( (todo , todoIndex) => {
                return(
                    <TodoCard  {...props} key={todoIndex} index={todoIndex} child ={todo}/>
                )
            })
        }
    </ul>
  )
}

export default TodoList