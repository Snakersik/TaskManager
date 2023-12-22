import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskContent, setContentName] = useState('');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskContentChange = (e) => {
    setContentName(e.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: new Date().getTime(),
        name: taskName,
        content: taskContent,
        status: 'Pending', 
      };

      onAddTask(newTask);

      setTaskName('');
      setContentName('');
    }
  };

  return (
    <div>
      <h2>Dodaj Nowe Zadanie</h2>
      <div>
        <label htmlFor="taskName">Nazwa Zadania</label>
        <input 
          placeholder="Nazwa zadania"
          type="text" 
          value={taskName} 
          onChange={handleTaskNameChange} 
        />
      </div>
      <div>
        <label htmlFor="taskContent">Opis</label>
        <textarea
          placeholder="Opis"
          value={taskContent}
          onChange={handleTaskContentChange}
          rows={4} // Adjust the number of rows as needed
          cols={50} // Adjust the number of columns as needed
        />
      </div>
      <button onClick={handleAddTask}>Dodaj Zadanie</button>
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