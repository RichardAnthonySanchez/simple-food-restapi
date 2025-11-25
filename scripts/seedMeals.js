import { Client } from "pg";
import fs from "fs";

const meals = JSON.parse(
  fs.readFileSync("docker/db/simple-meals.json", "utf8")
);

const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

async function seedMeals() {
  try {
    await client.connect();

    console.log("Clearing existing meals...");
    await client.query("DELETE FROM meals");

    for (const meal of meals) {
      await client.query(
        `INSERT INTO meals 
          (title, servings, prepTime, cookTime, totalTime, author, tags, image, ingredients, directions, links)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          meal.title || null,
          meal.servings || null,
          meal.prepTime || null,
          meal.cookTime || null,
          meal.totalTime || null,
          meal.author || null,
          JSON.stringify(meal.tags || []),
          meal.image || null,
          JSON.stringify(meal.ingredients || []),
          JSON.stringify(meal.directions || []),
          JSON.stringify(meal.links || []),
        ]
      );
    }

    console.log("Meals table seeded successfully!");
  } catch (err) {
    console.error("Error seeding meals:", err);
  } finally {
    await client.end();
  }
}

seedMeals();
