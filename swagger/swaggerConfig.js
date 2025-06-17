const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API",
      version: "1.0.0",
      description: "Below are the all routes",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/**/*.js"], // dynamic include
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
