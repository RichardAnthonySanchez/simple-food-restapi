import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";

import { pool } from "./db/pool.js";
import foodsRouter from "./routes/v1/foodsRouter.js";
import mealsRouter from "./routes/v1/mealsRouter.js";

const app = new Hono();

app.use("/api/*", cors());

app.route("/api/v1/foods", foodsRouter);
app.route("/api/v1/meals", mealsRouter);

app.get("/test", async (c) => {
  try {
    const result = await pool.query(
      "SELECT * FROM information_schema.tables WHERE table_schema = 'public' LIMIT 10"
    );
    return c.json({
      success: true,
      tables: result.rows,
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : JSON.stringify(err);
    return c.json(
      {
        success: false,
        error: message,
      },
      500
    );
  }
});

app.use("/*", serveStatic({ root: "./src/public" }));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export default app;
