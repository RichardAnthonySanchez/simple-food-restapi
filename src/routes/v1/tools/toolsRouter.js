const { Router } = require("express");
const { getCalorieCalculator } = require("../../../controllers/foods");

const toolsRouter = Router();

toolsRouter.get("/calorie-calculator", getCalorieCalculator);

module.exports = toolsRouter;
