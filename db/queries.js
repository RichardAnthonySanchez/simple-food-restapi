const pool = require("./pool");

async function getAllFoods(page = 1, limit = 100) {
  const offset = (page - 1) * limit;
  const query = `
    SELECT *
    FROM branded_open_foods
    LIMIT $1 OFFSET $2;
  `;
  const { rows } = await pool.query(query, [limit, offset]);
  return rows;
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

module.exports = {
  getAllFoods,
  getFoodById,
};
