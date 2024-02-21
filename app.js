const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'postgres',
  database: 'your_database_name',
  password: 'ZnJQQjM3MmRDZ0RSY1RyaQ==',
  port: 5432
});

app.get('/heartbeat', async (req, res, next) => {
  const test = await pool.query('SELECT NOW()');
  return res.status(200).send(test);
});

app.listen(3000, () => {
  console.log('application runningggg');
});
