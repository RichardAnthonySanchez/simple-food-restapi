import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

import { Pool } from "pg";

const app = new Hono();

const dbPort = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : undefined;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: dbPort,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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
