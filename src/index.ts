const path: typeof import("node:path") = require("node:path");
const express: typeof import("express") = require("express");

import type { Application } from "express";
const app: Application = express();

import type { Router } from "express";
const foodsRouter: Router = require("./routes/v1/foodsRouter");
const healthRouter: Router = require("./routes/v1/health/healthRouter");
const toolsRouter: Router = require("./routes/v1/tools/toolsRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/v1/foods", foodsRouter);
app.use("/api/v1/health", healthRouter);

app.use("/tools", toolsRouter);

app.use("/", express.static(path.join(__dirname, "public")));

import type { Request, Response, NextFunction } from "express";
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT: number = 3000;
const host: string = process.env.HOST ?? "localhost";
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Example app listening at http://${host}:${PORT}`);
});
