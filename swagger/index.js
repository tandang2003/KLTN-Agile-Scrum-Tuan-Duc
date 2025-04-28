const express = require("express");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const path = require("path");
require("dotenv").config();

const SwaggerParser = require("swagger-parser");

const app = express();
const port = process.env.PORT;

const swaggerFilePath = path.join(__dirname, "swagger", "swagger.yml");

// Use Swagger-Parser to resolve the references
SwaggerParser.dereference(swaggerFilePath)
  .then((swaggerDocument) => {
    // Serve Swagger UI
    app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Serve static files (Swagger YAML and components) if needed
    app.use("/swagger", express.static(path.join(__dirname, "swagger")));

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Error resolving Swagger file:", err);
  });
