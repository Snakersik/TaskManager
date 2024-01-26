import { useState, useEffect } from "react";
import AddTaskForm from "../components/AddTaskForm";
import Task from "../components/Task";
import { useTasksContext } from "../hooks/useTaskContext";

function Home() {
  const [displayCreate, setDisplayCreate] = useState(false);
  const { tasks, dispatch } = useTasksContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks");

      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_TASK", payload: json });
      }
    };

    fetchTasks();
  }, [dispatch]);

  function handleDisplayCreate() {
    setDisplayCreate(!displayCreate);
  }

  console.log("Tasks before rendering:", tasks); // Log tasks before rendering

  return (
    <div className="App">
      <h1>TaskManager</h1>
      <button className="btn createbtn" onClick={handleDisplayCreate}>
        DODAJ NOWE
      </button>
      {displayCreate ? (
        <AddTaskForm handleDisplayCreate={handleDisplayCreate} />
      ) : (
        ""
      )}
      <div className="TaskContainer">
        {tasks && Array.isArray(tasks) ? (
          tasks.map((task) => {
            return <Task key={task.Id} taskItem={task} />;
          })
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default Home;