require('dotenv').config();
const express = require('express');
const app = express();
const { Pool } = require('pg');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUi = require('swagger-ui-express');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432
});


app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/heartbeat', async (req, res, next) => {
  const timeFromDb = await pool.query('SELECT NOW()');
  return res.status(200).send({ timeFromDb: timeFromDb });
});

app.listen(3000, () => {
  console.log('application runningggg');
});
