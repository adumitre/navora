const pool = require('../config/db');

const getTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

const addTask = async (column_id, title, description, due_date) => {
  const result = await pool.query(
    'INSERT INTO tasks (column_id, title, description, created_at, due_date) VALUES ($1, $2, $3, NOW(), $4) RETURNING *',
    [column_id, title, description, due_date]
  );
  return result.rows[0];
};

module.exports = { getTasks, addTask };
