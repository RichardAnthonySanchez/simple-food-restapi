const CustomNotFoundError = require("../errors/CustomNotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const path = require("path");
const db = require("../db/queries");

async function getFoods(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    if (
      (req.query.page && (isNaN(page) || page <= 0)) ||
      (req.query.limit && (isNaN(limit) || limit <= 0))
    ) {
      throw new BadRequestError(
        "'page' and 'limit' must be positive integers."
      );
    }

    const validPage = page || 1;
    const validLimit = limit || 100;
    const offset = (validPage - 1) * validLimit;

    const [foods, totalCount] = await Promise.all([
      db.getFoods(validLimit, offset),
      db.countFoods(),
    ]);

    if (!foods || foods.length === 0) {
      throw new CustomNotFoundError("No food products found");
    }

    res.json({
      data: foods,
      metadata: {
        page: validPage,
        limit: validLimit,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / validLimit),
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getFoodById(req, res, next) {
  try {
    const foodId = parseInt(req.params.foodId);

    if (isNaN(foodId) || foodId <= 0) {
      throw new BadRequestError("product code must be a positive integer.");
    }
    const foodProduct = await db.getFoodById(Number(foodId));

    if (!foodProduct) {
      throw new CustomNotFoundError("Food product not found");
    }

    res.json(foodProduct);
  } catch (err) {
    next(err);
  }
}

async function getFoodsByCriteria(req, res, next) {
  try {
    const { category, maxCalories } = req.query;

    if (!category || !maxCalories) {
      throw new BadRequestError(
        "Both 'category' and 'maxCalories' are required."
      );
    }

    const foods = await db.getFoodsByCriteria(
      category,
      parseFloat(maxCalories)
    );

    if (!foods || foods.length === 0) {
      throw new CustomNotFoundError("No matching foods found.");
    }

    res.json({ data: foods });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getFoods,
  getFoodById,
  getFoodsByCriteria,
};
