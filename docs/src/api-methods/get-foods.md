## GET /foods — Retrieve All Foods

Returns a **paginated list** of foods from the database.
By default, it retrieves the **first 100 food items**, but supports filters and pagination through query parameters.

### Example Request

```
GET /foods
```

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "name": "Plain Yogurt",
      "brand": "Chobani",
      "ingredients": ["Milk", "Cultures"]
    }
  ],
  "page": 1,
  "total": 1
}
```

---

### Query Parameters

| Parameter    | Type      | Description                                          | Example                   |
| :----------- | :-------- | :--------------------------------------------------- | :------------------------ |
| **category** | `string`  | Filter results by food category                      | `/foods?category=poultry` |
| **brand**    | `string`  | Filter by brand name                                 | `/foods?brand=Nestle`     |
| **page**     | `integer` | Specify which page of results to retrieve            | `/foods?page=2`           |
| **limit**    | `integer` | Set how many items to return per page (default: 100) | `/foods?limit=50`         |

---

### Pagination Example

For a live demonstration of how pagination is handled in the front end, visit the **[Pagination Example Page](#)**.

This example page shows:

- How results are loaded and displayed across multiple pages
- How query parameters (`page` and `limit`) affect the data returned
- How to handle “next” and “previous” page navigation in a UI context

---

### Typical Errors

| Status                        | Meaning                              | Example                |
| :---------------------------- | :----------------------------------- | :--------------------- |
| **200 OK**                    | Successfully retrieved list of foods | —                      |
| **400 Bad Request**           | Invalid query parameter              | `/foods?page=abc`      |
| **404 Not Found**             | No foods matched the query           | `/foods?brand=Unknown` |
| **500 Internal Server Error** | Unexpected server issue              | —                      |

**Example Error Response:**

```json
{
  "error": "Invalid query parameters"
}
```
