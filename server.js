const express = require("express");
const path = require("path");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to your project folder.
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`);
});
