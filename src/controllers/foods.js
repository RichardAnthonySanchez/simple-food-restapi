const CustomNotFoundError = require("../errors/CustomNotFoundError");
const path = require("path");
const db = require("../../db/queries");

async function getFoods(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const offset = (page - 1) * limit;

    // Fetch data
    const [foods, totalCount] = await Promise.all([
      db.getFoods(limit, offset),
      db.countFoods(),
    ]);

    if (!foods || foods.length === 0) {
      throw new CustomNotFoundError("No food products found");
    }

    res.json({
      data: foods,
      metadata: {
        page,
        limit,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (err) {
    next(err);
  }
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
  getFoods,
  getFoodById,
};
