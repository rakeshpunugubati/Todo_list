import React, { useState } from 'react'

function TodoInput({todoValue , setTodoValue, handleAddTodo}) {
    
  return (
    <header>
        <input onChange={(e) => setTodoValue(e.target.value)} value={todoValue} type="text"  placeholder='Enter todo...' />
        <button onClick={() => {
            handleAddTodo(todoValue)
            setTodoValue('')
        }}>Add</button>
    </header>
  )
}

export default TodoInput