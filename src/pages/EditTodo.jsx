import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditTodo() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/todos";

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Todo not found");
        }

        const data = await response.json();

        setTitle(data.title);
        setStatus(data.status);
      } catch (error) {
        console.log(error);
        alert("Unable to load todo");
      } finally {
        setLoading(false);
      }
    };

    getTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(id),
          title: title,
          status: status,
        }),
      });

      if (response.ok) {
        alert("Todo updated successfully");
        navigate("/todos");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <main className="edit-page">
        <div className="edit-loading">
          Loading todo...
        </div>
      </main>
    );
  }

  return (
    <main className="edit-page">

      <div className="edit-page-header">

        <Link to="/todos" className="edit-back">
          ← Back to Tasks
        </Link>

        <p className="edit-eyebrow">
          EDIT TASK
        </p>

        <h1>Update your task</h1>

        <p>
          Change the task information and save your changes.
        </p>

      </div>

      <div className="edit-card">

        <div className="edit-card-header">

          <div className="edit-icon">
            ✎
          </div>

          <div>
            <h2>Task Details</h2>
            <p>
              Update the information below.
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="edit-input-group">

            <label>Task Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />

          </div>

          <div className="edit-input-group">

            <label>Status</label>

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

          <div className="edit-actions">

            <Link
              to="/todos"
              className="edit-cancel"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="edit-save"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default EditTodo;