## Getting Started With GET Foods

**Base URL:**
`https://simple-food-api.tonysancez.dev/api/v1`

### Example Request

```
GET /foods
```

### Typical Usage

By default, the `/foods` endpoint returns the **first 100 products** in the database.
You can use query parameters to **paginate** through the full dataset:

```
/foods?page=2&limit=100
```

- `page` — specifies which page of results to retrieve
- `limit` — sets how many items to return per page (default: 100)

### Typical Response

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

## Error Handling

The API returns **standard HTTP status codes** to indicate success or failure:

| Status                        | Meaning                      | Example Cause          |
| :---------------------------- | :--------------------------- | :--------------------- |
| **200 OK**                    | Request was successful       | —                      |
| **400 Bad Request**           | Invalid query parameters     | e.g. `/foods?page=abc` |
| **404 Not Found**             | Requested resource not found | e.g. `/foods/999999`   |
| **500 Internal Server Error** | Server-side problem          | —                      |

### Example REST Error

```json
{
  "error": "Food not found"
}
```
