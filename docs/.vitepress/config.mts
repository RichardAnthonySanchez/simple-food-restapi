import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: "Simple Foods API",
  description: "Whole food data at scale.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/api-methods/get-foods" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting Started", link: "/introduction/getting-started" },
          {
            text: "What Is Simple Food",
            link: "introduction/what-is-simple-food",
          },
        ],
      },
      {
        text: "API Methods",
        items: [
          { text: "GET Foods", link: "/api-methods/get-foods" },
          { text: "GET Foods By Id", link: "/api-methods/get-foodsbyid" },
          {
            text: "GET Foods By Filtering",
            link: "/api-methods/get-food-filter",
          },
          { text: "GET Server Uptime", link: "/api-methods/health" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/RichardAnthonySanchez/simple-food-restapi",
      },
    ],
  },
});
