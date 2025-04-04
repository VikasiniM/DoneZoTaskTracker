import React from "react";

const TaskList = ({ tasks, onToggle, onDelete, onEdit, onSnooze }) => {
  const buttonStyle = {
    backgroundColor: "#4f8ef7", // Blue color
    color: "#ffffff", // White text
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px", // Rounded corners
    fontWeight: "bold",
    cursor: "pointer",
    margin: "5px",
    transition: "background 0.3s ease",
  };

  const hoverStyle = {
    backgroundColor: "#357ae8", // Darker blue on hover
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-gray-100 p-2 rounded shadow-sm"
        >
          {/* Task Title */}
          <div className="flex-1 text-gray-800 font-medium">
            {task.snoozed ? (
              <span className="text-yellow-600 italic">⏳ Snoozed for few minutes</span>
            ) : task.completed ? (
              <span className="line-through text-green-600">{task.title}</span>
            ) : (
              task.title
            )}
          </div>

          {/* Buttons */}
          <div className="space-x-2">
            <button
              onClick={() => onSnooze(task.id)}
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = hoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              disabled={task.snoozed}
            >
              Snooze
            </button>
            <button
              onClick={() => onToggle(task.id)}
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = hoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = hoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
