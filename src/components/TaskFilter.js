import React from 'react';

function TaskFilter({ filter, setFilter, counts }) {
  return (
    <div className="filter-buttons">
      <button onClick={() => setFilter('all')}>All ({counts.all})</button>
      <button onClick={() => setFilter('completed')}>Completed ({counts.completed})</button>
      <button onClick={() => setFilter('pending')}>Pending ({counts.pending})</button>
    </div>
  );
}

export default TaskFilter;