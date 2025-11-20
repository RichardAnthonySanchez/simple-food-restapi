//const CustomNotFoundError = require("../errors/CustomNotFoundError");
//const BadRequestError = require("../errors/BadRequestError");
//const path = require("path");
import type { Context } from "hono";
import { getFoods, countFoods } from "../db/queries.js";

export async function getFoodsController(c: Context) {
  try {
    const page = parseInt(c.req.query("page") || "1", 10);
    const limit = parseInt(c.req.query("limit") || "100", 10);

    const validPage = page || 1;
    const validLimit = limit || 100;
    const offset = (validPage - 1) * validLimit;

    const [foods, totalCount] = await Promise.all([
      getFoods(validLimit, offset),
      countFoods(),
    ]);

    return c.json({
      data: foods,
      metadata: {
        page: validPage,
        limit: validLimit,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / validLimit),
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return c.json(
      {
        success: false,
        error: message,
      },
      500
    );
  }
}
/*
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

async function fetchFoodsByCriteria(category, maxCalories) {
  if (!category || !maxCalories) {
    throw new BadRequestError(
      "Both 'category' and 'maxCalories' are required."
    );
  }

  const foods = await db.getFoodsByCriteria(category, parseFloat(maxCalories));

  if (!foods || foods.length === 0) {
    throw new CustomNotFoundError("No matching foods found.");
  }

  return foods;
}

async function getFoodsByCriteria(req, res, next) {
  try {
    const { category, maxCalories } = req.query;
    const foods = await fetchFoodsByCriteria(category, maxCalories);
    res.json({ data: foods });
  } catch (err) {
    next(err);
  }
}

async function getCalorieCalculator(req, res, next) {
  try {
    const { category, maxCalories } = req.query;
    let foods = [];

    if (category && maxCalories) {
      foods = await fetchFoodsByCriteria(category, maxCalories);
    }

    res.render("calorie-calculator", {
      title: "Calorie Calculator",
      foods,
      query: req.query,
    });
  } catch (err) {
    next(err);
  }
}

*/
