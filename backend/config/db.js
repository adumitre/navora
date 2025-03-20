const { Pool } = require('pg');

const pool = new Pool({
  user : 'navora',
  host : 'localhost',
  database: 'navora',
  password: 'navoraPassword',
  port: 5432,
});

module.exports = pool;
