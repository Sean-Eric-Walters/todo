import React, { useState } from 'react';
import './App.css';

function App() {
  const [NewTodo, setNewTodo] = useState("");

  const[toDos, setTodos] = useState([]);

  const NewTodoSubmit = (e) => {
    e.preventDefault();

    if (NewTodo.length == 0) {
      return;
    }

    const todoItem = {
      text: NewTodo,
      cpmplete: false
    }

    setTodos([... toDos, todoItem])
    setNewTodo("");
  };

  const TodoDelete = (delIdex) => {
    const filteredTodos = toDos.filter((_todo, i) => {
      return i != delIdex;
    });

    setTodos(filteredTodos);
  }

  const markedComplete = (idx) => {
    const updatedTodos = toDos.map((todo, i) =>{
      if (idx === i) {
        todo.complete = !todo.complete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <body>
      <h1>ToDO List</h1>
      <div>
        <form onSubmit={(e) =>{
          NewTodoSubmit(e);
        }}>
          <input onChange={(e) =>{
            setNewTodo(e.target.value);
          }}
          type="text" value={NewTodo}/>
          <div>
            <button className="add">Add</button>
          </div>
        </form>
        <h2>My ToDos</h2>
        {toDos.map((todo, i) => {
          const todoClasses = []

          if (todo.complete) {
            todoClasses.push("line-through");
          }

          return (
            <div className="dos" key={i}>
              <input onChange={(e) => {
                markedComplete(i);
              }} checked={todo.cpmplete} type="checkbox" />
              <span className={todoClasses.join(" ")}>{todo.text}</span>
              <div><button className="delete" onClick={(e) => {
                TodoDelete(i);
              }}>Delete</button>
              </div>
          </div>
          );
        })}
      </div>
    </body>
  );
}

export default App;
