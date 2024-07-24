import { Todo } from "../model";

export interface Action {
  type: "add" | "remove" | "done" | "edit";
  payload: {
    id?: number;
    content?: string;
  };
} 

export const TodoReducer = (state: Todo[], action: Action) => {
  switch(action.type) {
    case "add":
      if (action.payload.content === undefined)
        return state;
      else
        return [
          ...state,
          { id: Date.now(), todo: action.payload.content, isDone: false }
        ];

    case "remove":
      if (action.payload.id === undefined)
        return state;
      else
        return state.filter((todo) => todo.id !== action.payload.id);
    case "done": 
      if (action.payload.id === undefined)
        return state;
      else
        return state.map((todo) => 
          todo.id === action.payload.id ? {...todo, isDone: !todo.isDone} : todo
        );
    case "edit":
      if (action.payload.id !== undefined && action.payload.content !== undefined) {
        let content = action.payload.content;
        return state.map(todo => todo.id===action.payload.id ? {...todo, todo: content} : todo)
      } else {
        return state;
      }
    default:
      return state;
  }
}
