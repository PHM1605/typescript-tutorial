import { createContext, Dispatch, useContext, useReducer } from "react";
import { Action, TodoReducer } from "./Reducer";
import { Todo } from "../model";

// Context might have many dispatches and many states; then const Context:... returns value = {{state1, dispatch1, state2, dispatch2}}
interface TodoContext {
  todos: Todo[];
  todosDispatch: Dispatch<Action>
}

const todoContext = createContext<TodoContext | null>(null);

const Context: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(TodoReducer, new Array<Todo>());
  return (
    <todoContext.Provider value={{todos: state, todosDispatch: dispatch}}>
      {children}
    </todoContext.Provider>
  );
}

export default Context;
export const TodoState = () => useContext(todoContext) as TodoContext;