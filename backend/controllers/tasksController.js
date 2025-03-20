const pool = require('../config/db'); // Import database connection

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY position');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { column_id, title, description, position, due_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (column_id, title, description, position, due_date, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [column_id, title, description, position, due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, position, due_date, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
