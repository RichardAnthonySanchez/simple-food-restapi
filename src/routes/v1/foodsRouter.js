const { Router } = require("express");
const {
  getFoodById,
  getFoods,
  getFoodsByCriteria,
} = require("../../controllers/foods");

const foodsRouter = Router();

foodsRouter.get("/", getFoods);

foodsRouter.get("/filter", getFoodsByCriteria);

foodsRouter.get("/:foodId", getFoodById);

module.exports = foodsRouter;
