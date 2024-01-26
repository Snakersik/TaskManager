import { useTasksContext } from "../hooks/useTaskContext";

const Task = ({ taskItem }) => {
  const { dispatch } = useTasksContext();

  const handleClick = async () => {
    dispatch({ type: "DELETE_TASK", payload: { Id: taskItem.Id } });

    const response = await fetch(`http://localhost:5000/tasks/${taskItem.Id}`, {
      method: "DELETE",
    });

    const json = response.status === 204 ? null : await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  return (
    <div className="taskBox">
      <div className="ButtonsContainer">
        <button className="btn" onClick={handleClick}>
          DELETE
        </button>
        <button className="btn">EDIT</button>
      </div>

      <h2>{taskItem.Title}</h2>
      <p>{taskItem.Description}</p>
    </div>
  );
};

export default Task;
