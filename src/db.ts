const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  database: "kidzie",
  user: "postgres",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
