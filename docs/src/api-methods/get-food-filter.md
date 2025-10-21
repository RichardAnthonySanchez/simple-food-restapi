# GET /api/foods/filter

Retrieve a list of branded food products filtered by **category** and **maximum calories per 100g**.

---

## Endpoint

```
GET /api/foods/filter
```

---

## 📋 Description

This endpoint allows clients to query the `branded_open_foods` database table for all food products that:

- Match a given **category keyword** (case-insensitive)
- Contain a **numeric energy_kcal_100g** value less than or equal to a given calorie limit

The response includes essential product details such as brand owner, product name, and calorie content.

---

## 🔧 Query Parameters

| Name          | Type     | Required | Description                                                                      | Example                         |
| ------------- | -------- | -------- | -------------------------------------------------------------------------------- | ------------------------------- |
| `category`    | `string` | ✅       | A keyword to match within the `branded_food_category` column (case-insensitive). | `snack`, `breakfast`, `protein` |
| `maxCalories` | `number` | ✅       | The maximum calories per 100g to filter by.                                      | `200`                           |

---

## 🧠 Example Request

```bash
GET /api/foods/filter?category=snack&maxCalories=250
```

---

## ✅ Example Successful Response

```json
{
  "data": [
    {
      "brand_owner": "ACME Snacks Co.",
      "product_name": "Crunchy Oat Bites",
      "energy_kcal_100g": "180"
    },
    {
      "brand_owner": "Nature's Joy",
      "product_name": "Trail Mix Delight",
      "energy_kcal_100g": "190"
    }
  ]
}
```

---

## ⚠️ Error Responses

| Status                      | Error Type            | Description                              |
| --------------------------- | --------------------- | ---------------------------------------- |
| `400 Bad Request`           | `BadRequestError`     | Missing or invalid query parameters.     |
| `404 Not Found`             | `CustomNotFoundError` | No products found matching the criteria. |
| `500 Internal Server Error` | `ServerError`         | Unexpected server or database issue.     |

---

## 🧩 Notes

- The search is **case-insensitive** (`ILIKE`).
- Only rows where `energy_kcal_100g` is a valid numeric value are included.
- Results are **not paginated** — all matching entries are returned.
- Suitable for use with a front-end form (e.g., `/filter` page) or API client.
