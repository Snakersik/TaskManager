const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

const config = {
  user: "sa",
  password: "Password1!",
  database: "TaskManagerDB",
  server: "sql-server",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function waitForDatabase() {
  let attempts = 0;
  const maxAttempts = 10;
  const delay = 10000; // 5 seconds

  while (attempts < maxAttempts) {
    try {
      console.log("Trying to connect to the database...");
      await sql.connect(config);
      console.log("Database connected successfully");
      return;
    } catch (error) {
      console.error("Error connecting to the database:", error);
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  console.error("Unable to connect to the database. Exiting...");
  process.exit(1);
}

async function initializeDatabase() {
  try {
    const pool = await sql.connect(config);
    const dbInit1 = await pool.request().query(`
      IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = 'TaskManagerDB')
      CREATE DATABASE TaskManagerDB;
    `);

    const dbInit2 = await pool.request().query(`
      USE TaskManagerDB;
    `);

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

    const usersTable = await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
      BEGIN
        CREATE TABLE Users (
          Id INT PRIMARY KEY IDENTITY(1,1),
          Username NVARCHAR(255) NOT NULL
        );
      END
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

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
//creating enw task
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
    const newTask = { Id: newTaskId, Title: title, Description: description };

    res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//editin task
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

waitForDatabase().then(() => {
  initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
