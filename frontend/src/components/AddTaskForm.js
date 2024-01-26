import React, { useState } from "react";
import { useTasksContext } from "../hooks/useTaskContext";

const AddTaskForm = ({ onAddTask, handleDisplayCreate }) => {
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handletitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handledescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = async () => {
    if (!title || !description) {
      setError("Please provide both title and description.");
      return;
    }
    const task = { title, description };

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setError(null);
      console.log("new task added", json);
      dispatch({ type: "CREATE_TASK", payload: json });
    } else {
      console.error("Invalid data format received from the server:", json);
    }
  };

  return (
    <div className="CreateTaskForm">
      <h2>Dodaj Nowe Zadanie</h2>

      <label htmlFor="taskName">Nazwa Zadania</label>
      <input
        placeholder="Nazwa zadania"
        type="text"
        value={title}
        onChange={handletitleChange}
      />

      <label htmlFor="taskContent">Opis</label>
      <textarea
        placeholder="Opis"
        value={description}
        onChange={handledescriptionChange}
        rows={4} // Adjust the number of rows as needed
        cols={50} // Adjust the number of columns as needed
      />
      {error && <p className="error-message">{error}</p>}
      <div className="ButtonsContainers">
        <button onClick={handleAddTask}>Dodaj Zadanie</button>
        <button onClick={handleDisplayCreate}>Anuluj</button>
      </div>
    </div>
  );
};

export default AddTaskForm;

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */
