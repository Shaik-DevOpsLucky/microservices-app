const express = require("express");
const app = express();

app.get("/assets", (req, res) => {
  res.json({
    service: "asset-search",
    data: ["Sensor", "Camera", "Laptop"]
  });
});

app.listen(3000, () => console.log("asset-search running"));
