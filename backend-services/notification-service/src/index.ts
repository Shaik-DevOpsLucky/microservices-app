import express from "express";
const app = express();

app.get("/notify", (_req, res) => {
  res.json({ service: "notification", message: "Notification sent" });
});

app.listen(3000, () => console.log("notification running"));
