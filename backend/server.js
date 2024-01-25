const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");

const app = express();
const PORT = process.env.PORT || 5000;

// Konfiguracja parsera do obsługi danych w formacie JSON
app.use(bodyParser.json());

// Konfiguracja połączenia z bazą danych
const config = {
  user: "sa",
  password: "Password1!",
  server: "sql-server",
  database: "TaskManager",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Database initializer function
async function initializeDatabase() {
  try {
    const pool = await sql.connect(config);

    // Check if Tasks table exists
    const tasksTable = await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Tasks')
      BEGIN
        CREATE TABLE Tasks (
          Id INT PRIMARY KEY IDENTITY(1,1),
          Title NVARCHAR(255) NOT NULL,
          Description NVARCHAR(MAX)
        );
      END
    `);

    // Check if Users table exists
    const usersTable = await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
      BEGIN
        CREATE TABLE Users (
          Id INT PRIMARY KEY IDENTITY(1,1),
          Username NVARCHAR(255) NOT NULL
        );
      END
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Endpoint do odczytu wszystkich zadań
app.get("/tasks", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Tasks");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint do odczytu konkretnego zadania
app.get("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id", sql.Int, taskId)
      .query("SELECT * FROM Tasks WHERE Id = @id");

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint do tworzenia nowego zadania
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .query(
        "INSERT INTO Tasks (Title, Description) VALUES (@title, @description); SELECT SCOPE_IDENTITY() AS newTaskId"
      );

    const newTaskId = result.recordset[0].newTaskId;
    res.json({ id: newTaskId, title, description });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint do edycji istniejącego zadania
app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, taskId)
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .query(
        "UPDATE Tasks SET Title = @title, Description = @description WHERE Id = @id"
      );

    res.json({ id: taskId, title, description });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint do usuwania zadania
app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, taskId)
      .query("DELETE FROM Tasks WHERE Id = @id");

    res.json({ message: "Task deleted successfully", id: taskId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

initializeDatabase();

// Nasłuchuj na określonym porcie
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
