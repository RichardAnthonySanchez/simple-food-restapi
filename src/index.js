const path = require("node:path");

require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const foodsRouter = require("./routes/v1/foodsRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.use("/api/v1/foods", foodsRouter);

app.get("/", (req, res) => {
  res.render("index", { message: "EJS rocks!" });
});

app.use("/foods", express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Example app listening at http://localhost:${PORT}`);
});
