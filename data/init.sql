USE master;
GO

IF NOT EXISTS (
    SELECT 1 
    FROM sys.databases 
    WHERE name = 'TaskManagerDB'
)
BEGIN
    CREATE DATABASE TaskManagerDB;
END;
GO