require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure you have this in your .env file or configure directly here
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
