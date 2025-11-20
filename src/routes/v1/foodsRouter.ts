import { Hono } from "hono";
import { getFoodsController } from "../../controllers/foods.js";

const foodsRouter = new Hono();

foodsRouter.get("/", getFoodsController);

/*
foodsRouter.get("/filter", getFoodsByCriteria);

foodsRouter.get("/:foodId", getFoodById);
*/

export default foodsRouter;
