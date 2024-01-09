import { useState } from "react";
import AddTaskForm from "./AddTaskForm";

const TaskBase = [
  {
    name: "Task1",
    desc: "Test Description",
  },
  {
    name: "Task2",
    desc: "Test Description",
  },
  {
    name: "Task3",
    desc: "Test Description",
  },
  {
    name: "Task4",
    desc: "Test Description",
  },
  {
    name: "Task5",
    desc: "Test Description Test DescriptionTest Description Test Description Test Description Test Description  Test Description",
  },
  {
    name: "Task6",
    desc: "Test Description Test DescriptionTest Description Test Description Test Description Test Description  Test Description",
  },
  {
    name: "Task7",
    desc: "Test Description Test DescriptionTest Description Test Description Test Description Test Description  Test Description",
  },
];

function App() {
  const [displayCreate, setDisplayCreate] = useState(false);

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
        {TaskBase.map((task, index) => (
          <Task key={index} name={task.name} desc={task.desc} />
        ))}
      </div>
    </div>
  );
}

const Task = ({ name, desc }) => {
  return (
    <div className="taskBox">
      <div className="ButtonsContainer">
        <button className="btn">DELETE</button>
        <button className="btn">EDIT</button>
      </div>

      <h2>{name}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default App;
