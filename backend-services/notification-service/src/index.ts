import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification Service API',
      version: '1.0.0',
      description: 'Notification microservice documentation',
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
  customSiteTitle: 'Notification Service API Documentation'
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, customCssOptions));

/**
 * @swagger
 * /notify:
 *   get:
 *     summary: Send notification
 *     description: Send a notification to users
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
 *                   example: notification
 *                 message:
 *                   type: string
 *                   example: Notification sent
 */
app.get("/notify", (_req: Request, res: Response) => {
  res.json({ service: "notification", message: "Notification sent" });
});

app.listen(3000, () => console.log("notification running"));
