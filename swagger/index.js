const express = require("express");
const swaggerUi = require("swagger-ui-express");
const SwaggerParser = require("swagger-parser");
const yaml = require("yamljs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Load main swagger.yml
const swaggerFilePath = path.join(__dirname, "swagger", "swagger.yml");

// Helper: Filter paths
const filterSwaggerPaths = (swaggerDoc, prefix) => {
  const filteredPaths = Object.keys(swaggerDoc.paths)
    .filter((path) => path.startsWith(prefix))
    .reduce((obj, key) => {
      obj[key] = swaggerDoc.paths[key];
      return obj;
    }, {});

  return {
    ...swaggerDoc,
    paths: filteredPaths,
  };
};

// Dereference the full swagger file once
SwaggerParser.dereference(swaggerFilePath)
  .then((fullDoc) => {
    // Full doc
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(fullDoc, { customSiteTitle: "Issue" })
    );

    // Issues docs
    const issueDoc = filterSwaggerPaths(fullDoc, "/issue");
    app.use("/api-docs/issues", swaggerUi.serve, swaggerUi.setup(issueDoc));

    app.listen(port, () => {
      console.log(`Full docs:   http://localhost:${port}/api-docs`);
      console.log(`Issue docs:  http://localhost:${port}/api-docs/issue`);
    });
  })
  .catch((err) => {
    console.error("Error loading Swagger:", err);
  });
