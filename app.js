const express = require('express');
const app = express();
const { Pool } = require('pg');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUi = require('swagger-ui-express');

// const pool = new Pool({
//   user: 'your_username',
//   host: 'postgres',
//   database: 'your_database_name',
//   password: 'ZnJQQjM3MmRDZ0RSY1RyaQ==',
//   port: 5432
// });


app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/heartbeat', async (req, res, next) => {
  // const test = await pool.query('SELECT NOW()');
  return res.status(200).send('oke');
});

app.listen(3000, () => {
  console.log('application runningggg');
});
