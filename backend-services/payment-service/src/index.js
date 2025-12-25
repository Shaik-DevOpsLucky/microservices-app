const express = require("express");
const app = express();

app.get("/payment", (req, res) => {
  res.json({
    service: "payment",
    status: "payment processed"
  });
});

app.listen(3000, () => console.log("payment running"));
