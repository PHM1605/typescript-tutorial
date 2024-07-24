import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoState } from './context/Context';
import { Todo } from './model';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const {todos, todosDispatch} = TodoState();
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent)=>{
    e.preventDefault();
    if(todo) {
      todosDispatch({
        type: "add",
        payload: {content:todo}
      })
      setTodo("");
    }    
  };

  return (
    <DragDropContext onDragEnd={(result: DropResult)=>{
      const { source, destination } = result;
      if (!destination) return;
      if (destination.droppableId === source.droppableId && source.index === destination.index) return;

      let add, active = todos, complete = completedTodos;
      // Remove that item from the source list/ destination list depend on which Droppable is pulled
      if (source.droppableId === "TodosList") {
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1)
      }
      // Drop it on the new list
      if (destination.droppableId === "TodosList") {
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }
    }}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
      </div>
    </DragDropContext>
    
  );
}

export default App;
