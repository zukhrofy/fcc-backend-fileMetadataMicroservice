const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

const uploadFiles = (req, res) => {
  const file = req.file;
  res.json({ name:file.originalname, type:file.mimetype, size:file.size });
};

app.post("/api/fileanalyse", upload.single("upfile"), uploadFiles);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
