const { Pool } = require("pg");

const connectionString =
  "postgres://bkjtijhn:S0CHWyOMjpA8ZyNDoBmjtQyJu4rrryi9@mouse.db.elephantsql.com/bkjtijhn";

const pool = new Pool({
  connectionString,
});

module.exports = pool;
