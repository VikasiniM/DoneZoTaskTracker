import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ProgressTracker from "./components/ProgressTracker";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (editTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editTask.id ? { ...t, ...task } : t))
      );
      setEditTask(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now(), ...task, completed: false, snoozed: false },
      ]);
    }
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleSnooze = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, snoozed: true } : task
      )
    );

    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, snoozed: false } : task
        )
      );
    }, 10 * 60 * 1000);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1 className="text-3xl font-bold mb-4 text-center">
        📋 DoneZo Task Tracker
      </h1>

      <TaskForm onSubmit={addTask} editTask={editTask} />

      <div className="filters flex justify-center space-x-4 my-4">
        <button
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "completed"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {tasks.length > 0 && (
        <div className="text-left text-sm font-medium text-green-600 mb-4 px-2">
          ✅ Task: <span className="font-semibold">{tasks[tasks.length - 1].title}</span>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2">
          📝 Your Tasks
        </h2>
        {filteredTasks.length > 0 && (
  <div className="text-left text-sm font-medium text-green-600 mb-4 px-2">
    ✅ Tasks:{" "}
    <span className="font-semibold">
      {filteredTasks.map((task, idx) => (
        <span key={task.id}>
          {task.title}
          {idx < filteredTasks.length - 1 && ", "}
        </span>
      ))}
    </span>
  </div>
)}


        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={handleEdit}
          onSnooze={handleSnooze}
        />
      </div>

      <ProgressTracker tasks={tasks} />
    </div>
  );
};

export default App;
