import pkg from "pg";
const { Pool } = pkg;

const connectionString =
  "postgres://bkjtijhn:S0CHWyOMjpA8ZyNDoBmjtQyJu4rrryi9@mouse.db.elephantsql.com/bkjtijhn";

const pool = new Pool({
  connectionString,
});

export default pool;
