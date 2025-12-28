const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Service API',
      version: '1.0.0',
      description: 'Payment microservice documentation',
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
  customSiteTitle: 'Payment Service API Documentation'
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, customCssOptions));

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Process payment
 *     description: Process a payment transaction
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
 *                   example: payment
 *                 status:
 *                   type: string
 *                   example: payment processed
 */
app.get("/payment", (req, res) => {
  res.json({
    service: "payment",
    status: "payment processed"
  });
});

app.listen(3000, () => console.log("payment running"));
