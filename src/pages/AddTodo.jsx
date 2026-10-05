import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  const navigate = useNavigate();

  const API_URL = "https://todo-api-bxqc.onrender.com/todos";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          status: status,
        }),
      });

      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="add-page">

      <div className="add-page-header">
        <Link to="/todos" className="back-link">
          ← Back to Tasks
        </Link>

        <p className="eyebrow">
          TODO MANAGEMENT
        </p>

        <h1>
          Add New Todo
        </h1>

        <p>
          Create a new task and add it to your list.
        </p>
      </div>


      <div className="add-card">

        <div className="add-card-header">

          <div className="add-icon">
            +
          </div>

          <div>
            <h2>
              Task Details
            </h2>

            <p>
              Enter the information below.
            </p>
          </div>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="add-input-group">

            <label>
              Task Title
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          </div>


          <div className="add-input-group">

            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

          </div>


          <div className="add-form-actions">

            <Link
              to="/todos"
              className="cancel-btn"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="create-btn"
            >
              Create Todo
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default AddTodo;