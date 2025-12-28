import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Service API',
      version: '1.0.0',
      description: 'Product microservice documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/index.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);
const customCssOptions = {
  customCss: '.swagger-ui .topbar { display: none } .swagger-ui .info .title { font-size: 32px; color: #3b82f6; }',
  customSiteTitle: 'Product Service API Documentation'
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, customCssOptions));

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get product list
 *     description: Retrieve a list of available products
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
 *                   example: product
 *                 products:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Phone", "Tablet"]
 */
app.get("/product", (_req: Request, res: Response) => {
  res.json({
    service: "product",
    products: ["Phone", "Tablet"]
  });
});

app.listen(3000, () => console.log("product running"));
