import React, { useState } from "react";
import { useTasksContext } from "../hooks/useTaskContext";

const Task = ({ taskItem }) => {
  const { dispatch } = useTasksContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(taskItem.Title);
  const [editedDescription, setEditedDescription] = useState(
    taskItem.Description
  );

  const handleDeleteClick = async () => {
    dispatch({ type: "DELETE_TASK", payload: { Id: taskItem.Id } });

    const response = await fetch(`http://localhost:5000/tasks/${taskItem.Id}`, {
      method: "DELETE",
    });

    const json = response.status === 204 ? null : await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const response = await fetch(`http://localhost:5000/tasks/${taskItem.Id}`, {
      method: "PUT", // or PATCH, depending on your server implementation
      body: JSON.stringify({
        title: editedTitle,
        description: editedDescription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({
        type: "EDIT_TASK",
        payload: {
          Id: taskItem.Id,
          Title: editedTitle,
          Description: editedDescription,
        },
      });
      setIsEditing(false);
    } else {
      console.error("Invalid data format received from the server:", json);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(taskItem.Title); // Restore the original title
    setEditedDescription(taskItem.Description); // Restore the original description
  };

  return (
    <div className="taskBox">
      <div className="ButtonsContainer">
        <button className="btn" onClick={handleDeleteClick}>
          DELETE
        </button>
        {isEditing ? (
          <>
            <button className="btn" onClick={handleSaveClick}>
              SAVE
            </button>
            <button className="btn" onClick={handleCancelClick}>
              CANCEL
            </button>
          </>
        ) : (
          <button className="btn" onClick={handleEditClick}>
            EDIT
          </button>
        )}
      </div>

      {isEditing ? (
        <>
          <label htmlFor="editedTitle">Edited Title</label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <label htmlFor="editedDescription">Edited Description</label>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows={4}
            cols={50}
          />
        </>
      ) : (
        <>
          <h2>{taskItem.Title}</h2>
          <p>{taskItem.Description}</p>
        </>
      )}
    </div>
  );
};

export default Task;
