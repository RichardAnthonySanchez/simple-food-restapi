const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const { Pool } = require("pg");

module.exports = new Pool({
  host: dbHost,
  user: dbUser,
  database: "simple_foods",
  password: dbPass,
  port: 5432,
});
