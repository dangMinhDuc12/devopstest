require('dotenv').config();
const express = require('express');
const app = express();
const { Pool } = require('pg');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api-docs');
const swaggerUi = require('swagger-ui-express');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/heartbeat', async (req, res, next) => {
  const versionDb = await pool.query('SELECT VERSION()');
  return res.status(200).send({ versionDb });
});

app.listen(6302, () => {
  console.log(`application running on port 6302`);
});
