import { Link, Route, Routes } from "react-router-dom";

import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";

function App() {
  return (
    <>
      {/* HEADER */}

      <header className="topbar">
        <div className="nav-container">

          <Link to="/todos" className="brand">
            <span className="brand-mark">✓</span>
            Todo Manager
          </Link>

          <nav>
            <Link to="/todos">
              Tasks
            </Link>
          </nav>

        </div>
      </header>


      {/* ROUTES */}

      <Routes>

        <Route
          path="/"
          element={<TodoList />}
        />

        <Route
          path="/todos"
          element={<TodoList />}
        />

        <Route
          path="/add-todo"
          element={<AddTodo />}
        />

        <Route
          path="/edit-todo/:id"
          element={<EditTodo />}
        />

      </Routes>
    </>
  );
}

export default App;