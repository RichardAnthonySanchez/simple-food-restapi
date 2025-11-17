const path = require("node:path");

const express = require("express");
const cors = require("cors");

const app = express();

const foodsRouter = require("./routes/v1/foodsRouter");
const healthRouter = require("./routes/v1/health/healthRouter");
const toolsRouter = require("./routes/v1/tools/toolsRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.use("/api/v1/foods", foodsRouter);
app.use("/api/v1/health", healthRouter);

app.use("/tools", toolsRouter);

app.use("/", express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
const host = process.env.HOST;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Example app listening at http://${host}:${PORT}`);
});
