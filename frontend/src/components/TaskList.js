import { useEffect, useState } from 'react';
import { fetchTasks } from '../api/tasks';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const data = await fetchTasks();
      setTasks(data);
    }
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
