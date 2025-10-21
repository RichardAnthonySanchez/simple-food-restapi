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

async function getFoodsByCriteria(categoryKeyword, maxCalories) {
  const query = `
    SELECT *
    FROM branded_open_foods
    WHERE 
      branded_food_category ILIKE $1
      AND energy_kcal_100g ~ '^[0-9.]+$'
      AND CAST(energy_kcal_100g AS FLOAT) <= $2
  `;

  const result = await pool.query(query, [`%${categoryKeyword}%`, maxCalories]);
  return result.rows;
}

module.exports = {
  getFoods,
  getFoodById,
  countFoods,
  getFoodsByCriteria,
};
