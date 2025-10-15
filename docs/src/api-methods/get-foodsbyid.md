## GET /foods/:id

Retrieves a **single food item** by its unique `id`.

### Example Request

```
GET /foods/1
```

### Example Response

```json
{
  "id": 1,
  "name": "Plain Yogurt",
  "brand": "Chobani",
  "ingredients": ["Milk", "Cultures"]
}
```

### Description

This endpoint is ideal when you already know the **specific ID** of a food item and want to fetch **only that item’s details**.
It returns a single, lightweight JSON object instead of a full dataset—making it faster and more efficient for targeted lookups.

For example:

- Displaying a **detailed product page** for a user who selected an item from a list.
- Fetching **fresh or updated data** for a single product without reloading all foods.
- Reducing **bandwidth usage** by requesting only what’s needed, rather than paginated results.

### Typical Errors

| Status                        | Meaning                              | Example        |
| :---------------------------- | :----------------------------------- | :------------- |
| **200 OK**                    | Successfully retrieved the food item | —              |
| **404 Not Found**             | The requested ID does not exist      | `/foods/99999` |
| **500 Internal Server Error** | Unexpected server issue              | —              |

**Example Error Response:**

```json
{
  "error": "Food not found"
}
```
