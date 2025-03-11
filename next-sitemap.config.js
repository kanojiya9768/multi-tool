module.exports = {
  siteUrl:
    process.env.NODE_ENV === "production"
      ? "https://multi-tool-eosin.vercel.app"
      : "http://localhost:3000",
  generateRobotsTxt: true, // Generate robots.txt
  sitemapSize: 7000, // Sitemap size limit
  outDir: "./public", // Directory to output the sitemap
  changefreq: "daily", // Frequency of updates for each page
  priority: 0.7, // Default priority for pages
  additionalPaths: async (config) => {
    const tools = [
      "unit-converter",
      "text-case-converter",
      "password-generator",
      "complex-calculator",
      "loan-calculator",
      "image-resizer",
      "image-compressor",
      "todo-app",
      "age-calculator",
      "random-joke-generator",
      "trivia-quiz",
      "image-converter",
      "advanced-image-converter",
      "image-to-pdf-converter",
      "r-code-generator",
      "qr-code-reader"
    ];


    console.log('Environment:', process.env.NODE_ENV);

    const toolPaths = tools.map((tool) => ({
      loc: `/tools/${tool}`,
      changefreq: "daily",
      priority: 0.8,
    }));

    return [...toolPaths];
  },
};
