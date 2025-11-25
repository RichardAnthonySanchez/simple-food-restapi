import { Hono } from "hono";
import type { Context } from "hono";
import { getMealsController } from "../../controllers/meals.js";

const mealsRouter = new Hono();

mealsRouter.get("/", getMealsController);

export default mealsRouter;
