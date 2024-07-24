import React from 'react';
import "./styles.css";
import SingleTodo from './SingleTodo';
import { TodoState } from '../context/Context';

const TodoList: React.FC = () => {
  const {todos} = TodoState()
  return (
    <div className="todos">
      {todos.map((todo)=>(
        <SingleTodo todo={todo} key={todo.id}/>
      ))}
    </div>
  )
}

export default TodoList;