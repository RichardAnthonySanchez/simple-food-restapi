const { Router } = require("express");
const { getAllFoods, getFoodById } = require("../controllers/foods");

const foodsRouter = Router();

foodsRouter.get("/", getAllFoods);

foodsRouter.get("/:foodId", getFoodById);

module.exports = foodsRouter;
