const express = require('express');
const app = express();
const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'postgresdb',
//   database: 'postgres',
//   password: 'postgres',
//   port: 5432,
// });

app.get('/heartbeat', async (req, res, next) => {
  // const test = await pool.query('SELECT NOW()');
  return res.status(200).send('Heartbeat routeee');
});

app.listen(3000, () => {
  console.log('application runningggg');
});
