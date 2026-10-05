import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const API_URL = "http://localhost:3000/todos";

  // GET TODOS
  const getTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // DELETE TODO
  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // COUNTS
  const total = todos.length;

  const pending = todos.filter(
    (todo) => todo.status === "Pending"
  ).length;

  const completed = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  return (
    <main className="page">

      {/* HEADER */}

      <div className="hero">

        <div>
          <p className="eyebrow">
            TODO MANAGEMENT
          </p>

          <h1>My Tasks</h1>

          <p className="hero-text">
            Manage your daily tasks easily.
          </p>
        </div>

        {/* ONLY ONE ADD TASK BUTTON */}

        <Link
          to="/add-todo"
          className="main-button"
        >
          Add Task
        </Link>

      </div>


      {/* SUMMARY */}

      <div className="summary">

        <div className="summary-item">
          <span className="summary-number">
            {total}
          </span>

          <span className="summary-label">
            Total Tasks
          </span>
        </div>


        <div className="summary-item">
          <span className="summary-number">
            {pending}
          </span>

          <span className="summary-label">
            Pending
          </span>
        </div>


        <div className="summary-item">
          <span className="summary-number">
            {completed}
          </span>

          <span className="summary-label">
            Completed
          </span>
        </div>

      </div>


      {/* TASK SECTION */}

      <section>

        <div className="section-title">

          <div>
            <h2>Tasks</h2>

            <p>
              Your current to-do items
            </p>
          </div>

          <span className="task-total">
            {total} {total === 1 ? "task" : "tasks"}
          </span>

        </div>


        {/* TASKS */}

        <div className="tasks">

          {todos.length === 0 ? (

            <div className="no-tasks">
              <h3>No tasks found</h3>

              <p>
                Add your first task to get started.
              </p>
            </div>

          ) : (

            todos.map((todo) => (

              <div
                className="task"
                key={todo.id}
              >

                {/* TASK LEFT */}

                <div className="task-left">

                  <div
                    className={
                      todo.status === "Completed"
                        ? "task-circle done"
                        : "task-circle"
                    }
                  >
                    {todo.status === "Completed" && "✓"}
                  </div>


                  <div className="task-info">

                    <h3>
                      {todo.title}
                    </h3>

                    <p>
                      Task ID: {todo.id}
                    </p>

                  </div>

                </div>


                {/* TASK RIGHT */}

                <div className="task-right">

                  <span
                    className={
                      todo.status === "Completed"
                        ? "status done-status"
                        : "status pending-status"
                    }
                  >
                    {todo.status}
                  </span>


                  <Link
                    to={`/edit-todo/${todo.id}`}
                    className="edit"
                  >
                    Edit
                  </Link>


                  <button
                    className="delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

    </main>
  );
}

export default TodoList;