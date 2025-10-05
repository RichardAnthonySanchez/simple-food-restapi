const CustomNotFoundError = require("../errors/CustomNotFoundError");
const path = require("path");
const db = require("../../db/queries");

async function getAllFoods(req, res) {
  const foods = await db.getAllFoods();

  if (!foods) {
    throw new CustomNotFoundError("No food products found");
  }
  res.json(foods);
}

async function getFoodById(req, res) {
  const foodId = req.params.foodId;

  const foodProduct = await db.getFoodById(Number(foodId));

  if (!foodProduct) {
    throw new CustomNotFoundError("Food product not found");
  }

  res.json(foodProduct);
}

module.exports = {
  getAllFoods,
  getFoodById,
};
