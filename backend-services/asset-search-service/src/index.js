const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Asset Search Service API',
      version: '1.0.0',
      description: 'Asset search microservice documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/index.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
const customCssOptions = {
  customCss: '.swagger-ui .topbar { display: none } .swagger-ui .info .title { font-size: 32px; color: #3b82f6; }',
  customSiteTitle: 'Asset Search Service API Documentation'
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, customCssOptions));

/**
 * @swagger
 * /assets:
 *   get:
 *     summary: Search assets
 *     description: Search and retrieve available assets
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: string
 *                   example: asset-search
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Sensor", "Camera", "Laptop"]
 */
app.get("/assets", (req, res) => {
  res.json({
    service: "asset-search",
    data: ["Sensor", "Camera", "Laptop"]
  });
});

app.listen(3000, () => console.log("asset-search running"));
