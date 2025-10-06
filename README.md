# Simple Foods API (WIP)

This is a work-in-progress REST API that provides information about simple food products — specifically items with **three ingredients or fewer**.

## Status

⚠️ **Early development**
The app is not ready for installation or external use yet. We’re currently setting up the initial Express + Postgres + Prisma stack and defining API routes. Expect frequent changes.

## Stack

- [Express.js](https://expressjs.com/) – Web framework for building the API
- [PostgreSQL](https://www.postgresql.org/) – Database for storing food product data
- [Prisma](https://www.prisma.io/) – ORM for managing database queries and schema

## Planned Features

- **Core Endpoints**

  - `GET /foods` – list products (with filters, sort, pagination)
  - `GET /foods/:id` – product details

- **Filtering / Sorting / Pagination**

  - `/foods?page=2&limit=50`

- **HTTP Status Codes**

  - `200 OK`,
  - `400 Bad Request`, `404 Not Found`, `500 Server Error`

- **Docs & Versioning**

  - Versioned endpoints: `api/v1/foods`

- **Future Enhancements**

  - Rate limiting & caching
  - Bulk operations
  - `/search` endpoint
  - `/health` check

## Development Roadmap

1. Initialize Express server and database connection
2. Define food product schema in PostgreSQL (managed through Prisma)
3. Seed database with sample data
4. Implement initial GET routes
5. Add testing and documentation

## Contributing

We’re not accepting external contributions at this stage, but feedback and ideas are welcome.

## License

TBD

---

_This README will evolve as the project progresses._
