import fs from "fs";

// Read raw JSON
const rawMeals = JSON.parse(
  fs.readFileSync("./docker/db/simple-meals.json", "utf-8")
);

function sanitizeMeal(meal: any) {
  return {
    title: typeof meal.title === "string" ? meal.title : null,
    servings: typeof meal.servings === "number" ? meal.servings : null,
    prepTime: typeof meal.prepTime === "string" ? meal.prepTime : null,
    cookTime: typeof meal.cookTime === "string" ? meal.cookTime : null,
    totalTime: typeof meal.totalTime === "string" ? meal.totalTime : null,
    author: typeof meal.author === "string" ? meal.author : null,
    tags: Array.isArray(meal.tags) ? meal.tags.map(String) : [],
    image: typeof meal.image === "string" ? meal.image : null,
    ingredients: Array.isArray(meal.ingredients)
      ? meal.ingredients.map(String)
      : [],
    directions: Array.isArray(meal.directions)
      ? meal.directions.map(String)
      : [],
    links: Array.isArray(meal.links)
      ? meal.links.map((link: any) => ({
          type: typeof link.type === "string" ? link.type : "",
          url: typeof link.url === "string" ? link.url : "",
        }))
      : [],
  };
}

// Sanitize all meals
const sanitizedMeals = rawMeals.map(sanitizeMeal);

// Write sanitized JSON to a new file (or overwrite the old one)
fs.writeFileSync(
  "./simple-meals-clean.json",
  JSON.stringify(sanitizedMeals, null, 2),
  "utf-8"
);

console.log(
  `Sanitized ${sanitizedMeals.length} meals and wrote to simple-meals-clean.json`
);
