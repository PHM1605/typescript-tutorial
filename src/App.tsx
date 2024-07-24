import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoState } from './context/Context';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const {todosDispatch} = TodoState();

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
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList />
    </div>
  );
}

export default App;
