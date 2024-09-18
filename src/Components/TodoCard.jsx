import React from 'react'

function TodoCard(props) {
  const{child , handleDeleteTodo, index, handleEditTodo } = props;
  return (
    <div>
        <li className='todoItem'>
            <p>{child}</p>
            <i className="fa-solid fa-pen-to-square" onClick={() => handleEditTodo(index)}></i>
            <i className="fa-solid fa-trash" onClick={() => handleDeleteTodo(index)}></i>    
        </li>
    </div>
  )
}

export default TodoCard