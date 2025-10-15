## GET /health — Health Check Monitor

Use this endpoint to **check the server’s operational status** or confirm the API is running properly.
It’s helpful for **uptime monitoring**, **CI/CD pipelines**, or simple programmatic checks before sending real requests.

### Example Request

```
GET /health
```

### Example Response

```json
{
  "uptime": "13 minutes, 31 seconds",
  "message": "OK",
  "timestamp": "Monday, October 13th, 2025 at 6:34:14 AM"
}
```

### Description

This endpoint verifies that the API is **alive and responsive**.
It reports:

- **uptime** – how long the server has been running
- **message** – the current operational status (e.g., `"OK"`, `"Degraded"`, `"Down"`)
- **timestamp** – the current server time, useful for syncing logs and monitoring scripts

Developers and DevOps teams can ping this route periodically to ensure the API is online, or include it in automated health monitors.

---

### Public Dashboard

A **visual health monitor** is also available, displaying:

- **Uptime**
- **Status message**
- **Timestamp**

This dashboard provides a quick at-a-glance view of the API’s overall health.

---

### Typical Errors

| Status                        | Meaning                        | Example |
| :---------------------------- | :----------------------------- | :------ |
| **200 OK**                    | Server is healthy              | —       |
| **500 Internal Server Error** | Server is down or unresponsive | —       |

**Example Error Response:**

```json
{
  "error": "Server health check failed"
}
```
