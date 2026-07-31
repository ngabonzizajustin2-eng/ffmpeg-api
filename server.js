import express from "express";

const app = express();

app.use(express.json({ limit: "100mb" }));

app.get("/", (req, res) => {
  res.send("FFmpeg API is running");
});

app.post("/render", async (req, res) => {
  res.json({
    success: true,
    message: "API received the request.",
    received: req.body,
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
