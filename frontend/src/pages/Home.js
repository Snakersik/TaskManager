import { useState, useEffect } from "react";
import AddTaskForm from "../components/AddTaskForm";
import { useTasksContext } from "../hooks/useTaskContext";

function Home() {
  const [displayCreate, setDisplayCreate] = useState(false);
  const { tasks, dispatch } = useTasksContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        dispatch({ type: "SET_TASK", payload: json });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  function handleDisplayCreate() {
    setDisplayCreate(!displayCreate);
  }

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
        {tasks &&
          tasks.map((task) => {
            console.log("Task item:", task);
            return <Task key={task.Id} taskItem={task} />;
          })}
      </div>
    </div>
  );
}

const Task = ({ taskItem }) => {
  return (
    <div className="taskBox">
      <div className="ButtonsContainer">
        <button className="btn">DELETE</button>
        <button className="btn">EDIT</button>
      </div>

      <h2>{taskItem.Title}</h2>
      <p>{taskItem.Description}</p>
    </div>
  );
};

export default Home;
