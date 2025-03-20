import React, { useEffect, useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import './output.css'; // Import the compiled Tailwind CSS

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    fetch(`/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]))
      .catch((error) => console.error('Error adding task:', error));
  };

  const revertTask = (id: number) => {
    fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'pending' }),
    })
      .then(() =>
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, status: 'pending' } : task
          )
        )
      )
      .catch((error) => console.error('Error updating task:', error));
  };

  const updateTask = (id: number) => {
    fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' }),
    })
      .then(() =>
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, status: 'completed' } : task
          )
        )
      )
      .catch((error) => console.error('Error updating task:', error));
  };

  const deleteTask = (id: number) => {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4 flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Navora</h2>
        <ThemeToggle />
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="text-blue-500 hover:underline">
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-blue-500 hover:underline">
                Tasks
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-blue-500 hover:underline">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>
        </header>

        {/* Task Creation Form */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={addTask}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </section>

        {/* Task List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Task List</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 bg-white dark:bg-gray-800 rounded shadow"
              >
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-sm italic">Status: {task.status}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => revertTask(task.id)}
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Set Pending
                  </button>
                  <button
                    onClick={() => updateTask(task.id)}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Mark Complete
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default App;
