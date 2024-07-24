import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { TodoState } from '../context/Context';

type Props = {
  todo: Todo;
};

const SingleTodo = ({todo}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const {todosDispatch} = TodoState()

  const handleDone = (id:number) => {
    todosDispatch({
      type: "done",
      payload: {id: id}
    });
  };

  const handleDelete = (id:number) => {
    todosDispatch({
      type: "remove",
      payload: {id: id}
    });
  }
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    todosDispatch({
      type: "edit",
      payload: {
        id: id,
        content: editTodo
      }
    });
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos_single" onSubmit={(e)=>handleEdit(e, todo.id)}>
      {
        edit ? (
          <input 
            ref={inputRef}
            value={editTodo}
            onChange={(e)=>setEditTodo(e.target.value)}
            className="todo_single--text"
          />
        ): todo.isDone ? (
          <s className='todos_single--text'>{todo.todo}</s>
        ): (
          <span className='todos_single--text'>{todo.todo}</span>
        )
      }
      
      <div>
        <span className="icon" onClick={()=>{
          if (!edit && !todo.isDone) {
            setEdit(!edit);
          }
        }}><AiFillEdit /></span>
        <span className="icon" onClick={()=>handleDelete(todo.id)}><AiFillDelete /></span>
        <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone /></span>
      </div>
    </form>
  )
}

export default SingleTodo