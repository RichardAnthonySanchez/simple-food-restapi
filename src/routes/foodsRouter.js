const { Router } = require("express");
const { getFoodById, getFoods } = require("../controllers/foods");

const foodsRouter = Router();

foodsRouter.get("/", getFoods);

foodsRouter.get("/:foodId", getFoodById);

module.exports = foodsRouter;
