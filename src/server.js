import "mssql";

const sql = require('mssql');
const config = {
  server: 'localhost',
  database: 'TaskManager',
  options: {
    trustServerCertificate: true, // Change this based on your needs
    trustedConnection: true ,
  },
};
createTable();

async function connect() {
  try {
    await sql.connect(config);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

async function close() {
  try {
    await sql.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error.message);
  }
}

function createTable() {
  const request = new sql.Request();
  sql.connect(config);
  const taskResult = sql.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Tasks'`;
  const userResult = sql.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users'`;

  if(taskResult.recordset.length==null)
  {
    const query = `
    CREATE TABLE Tasks (
      ID INT PRIMARY KEY,
      Name NVARCHAR(255),
      Description NVARCHAR(MAX)
    )
    `;
    request.query(query)
      .then(() => {
        console.log('Tasks table created successfully');
        sql.close();
      })
      .catch((err) => {
        console.error('Error creating table:', err);
        sql.close();
      });
  } else {
    console.log('Tasks table exists')
  }
  if(userResult.recordset.length==null)
  {
    const query = `
      CREATE TABLE Users (
      ID INT PRIMARY KEY,
      Username NVARCHAR(255),
      Password NVARCHAR(MAX)
    )
    `;
    request.query(query)
      .then(() => {
        console.log('Users table created successfully');
        sql.close();
      })
      .catch((err) => {
        console.error('Error creating table:', err);
        sql.close();
      });
  } else {
    console.log('Users table exists')
  }
}

export default createTable;