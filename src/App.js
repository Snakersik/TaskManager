function App() {
  return (
    <div className="App">
      <h1>taskManager</h1>
      <div className="TaskBox">
        <Tasks />
        <Tasks />
        <Tasks />
        <Tasks />
      </div>
    </div>
  );
}

const Tasks = () => {
  return (
    <div className="taskBox">
      <h2>Task</h2>
      <p>Task Desc</p>
    </div>
  );
};

export default App;
