import express from "express";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath.path);

const app = express();
const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("FFmpeg API is running");
});

app.post(
  "/render",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const video = req.files.video[0].path;
      const audio = req.files.audio[0].path;

      if (!fs.existsSync("output")) {
        fs.mkdirSync("output");
      }

      const output = path.join("output", `video-${Date.now()}.mp4`);

      ffmpeg(video)
  .input(audio)
  .outputOptions([
    "-loop 1",
    "-c:v libx264",
    "-tune stillimage",
    "-pix_fmt yuv420p",
    "-c:a aac",
    "-shortest"
  ])
  .save(output)
  .on("end", () => {
    res.download(output);
  })
  .on("error", (err) => {
    console.error(err);
    res.status(500).json({ error: err.message });
  });
      res.status(500).json({ error: err.message });
    }
  }
);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
