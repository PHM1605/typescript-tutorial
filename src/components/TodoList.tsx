import React from 'react';
import "./styles.css";
import SingleTodo from './SingleTodo';
import { TodoState } from '../context/Context';
import { Todo } from '../model';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({completedTodos, setCompletedTodos}) => {
  const {todos} = TodoState()
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot)=> (
            <div className={`todos ${snapshot.isDraggingOver?'dragactive':''}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todos_heading">Active Tasks</span>
              {todos.map((todo, index) =>(
                <SingleTodo index={index} todo={todo} key={todo.id} />
              ))}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {
          (provided, snapshot) => (
            <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete": ""}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todos_heading">Completed Tasks</span>
              {completedTodos.map((todo, index) =>(
                <SingleTodo index={index} todo={todo} key={todo.id} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
              ))}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      
    </div>
    
  )
}

export default TodoList;