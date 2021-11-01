import React, { useState, useEffect, Fragment } from "react";
import Todo from "../../components/Todo";
import NewTodoForm from "../../components/TodoForm";
import { fechTasks, completeTask } from "../../services/tasks";
import "./style.css";

function TodoList() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {

    (async () => {

      const tasks = await fechTasks();

      console.log('task -->', tasks);

      if (!tasks) {

        setTodos([]);

      } else {

        setTodos(tasks);

      };

    })()

  }, []);

  const create = newTodo => {
    setTodos([...todos, newTodo]); //Se está agregando la tarea en el estado
  };

  const remove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const update = (id, updtedTask) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, ...updtedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = async id => {
    let updateObj;
    const updatedTodos = todos.map( todo => {
      if (todo.id === id) {
        updateObj = todo
        //completeTask(id, todo); //Para completar (marcar) la tarea en el back
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    await completeTask(id, updateObj);
    setTodos(updatedTodos);
  };

  return (
    <div className="TodoList">
      <h1>
        Taskit <span>Lista de tareas</span>
      </h1>
      <ul>
        {
          todos.length === 0 ? (
            null
          ) : (
            todos.map((todo, index) => {
              return (
                <Fragment key={index.toString()} >
                  <Todo
                    toggleComplete={toggleComplete}
                    update={update}
                    remove={remove}
                    key={todo.id}
                    todo={todo}
                  />
                </Fragment>
              )
            })
          )
        }
      </ul>
      <NewTodoForm createTodo={create} />
    </div>
  );
}

export default TodoList;
