const pool = require("./pool");

async function getFoods(limit, offset) {
  const query = `SELECT * FROM branded_open_foods ORDER BY code LIMIT $1 OFFSET $2`;
  const result = await pool.query(query, [limit, offset]);
  return result.rows;
}

async function getFoodById(upc) {
  const query = `
    SELECT *
    FROM branded_open_foods
    WHERE code = $1
  `;
  const { rows } = await pool.query(query, [upc]);
  return rows[0];
}

async function countFoods() {
  const result = await pool.query(`SELECT COUNT(*) FROM branded_open_foods`);
  return parseInt(result.rows[0].count, 10);
}

module.exports = {
  getFoods,
  getFoodById,
  countFoods,
};
