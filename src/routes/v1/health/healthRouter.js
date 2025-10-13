const { Router } = require("express");
const { formatUptime, formatTimestamp } = require("./helpers");

const healthRouter = Router();

healthRouter.get("/", async (req, res, next) => {
  try {
    const health = {
      uptime: formatUptime(process.uptime()),
      message: "OK",
      timestamp: formatTimestamp(Date.now()),
    };

    res.status(200).json(health);
  } catch (error) {
    next(error);
  }
});

module.exports = healthRouter;
