import type { Context } from "hono";
import { getMeals } from "../db/queries.js";

export async function getMealsController(c: Context) {
  try {
    const meals = await getMeals();
    return c.json({
      data: meals,
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
