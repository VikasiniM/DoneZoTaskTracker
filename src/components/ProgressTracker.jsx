import React from "react";

const ProgressTracker = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-tracker">
      <p>{completed} of {total} tasks completed ({percent}%)</p>
      <progress value={completed} max={total}></progress>
    </div>
  );
};

export default ProgressTracker;
