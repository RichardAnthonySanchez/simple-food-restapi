const { format } = require("date-fns");

function formatUptime(seconds) {
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor((seconds / 3600) % 24);
  const d = Math.floor(seconds / 86400);

  const parts = [];
  if (d) parts.push(`${d} day${d > 1 ? "s" : ""}`);
  if (h) parts.push(`${h} hour${h > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} minute${m > 1 ? "s" : ""}`);
  if (s) parts.push(`${s} second${s > 1 ? "s" : ""}`);

  return parts.join(", ") || "0 seconds";
}

function formatTimestamp(ms) {
  return format(ms, "EEEE, MMMM do, yyyy 'at' h:mm:ss a");
}

module.exports = { formatUptime, formatTimestamp };
