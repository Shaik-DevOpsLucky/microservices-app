import express from "express";
const app = express();

app.get("/product", (_req, res) => {
  res.json({
    service: "product",
    products: ["Phone", "Tablet"]
  });
});

app.listen(3000, () => console.log("product running"));
