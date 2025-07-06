import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><small>Created at: {new Date(task.createdAt).toLocaleString()}</small></p>
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? 'Mark as Pending' : 'Mark as Complete'}
      </button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;