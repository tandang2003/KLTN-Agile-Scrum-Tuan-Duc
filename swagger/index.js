const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

// Serve all files from /public
app.use(express.static(path.join(__dirname, "public")));

// Root URL loads index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`Full docs:   http://localhost:${port}`);
});
