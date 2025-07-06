import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { loadTasks, saveTasks } from './utils/localStorage';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="App">
      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <>
          <h2>Welcome, {username}!</h2>
          <TaskForm addTask={addTask} />
          <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
          <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </>
      )}
    </div>
  );
}

export default App;