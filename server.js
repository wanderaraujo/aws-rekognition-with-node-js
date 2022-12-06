require("dotenv").config();
const express = require("express");

//Configure the route mechanism to call facial detect methods
const routes = require("./routes/index");

//Create a new Express application.
const app = express();

//Use application-level middleware for common functionality, including
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ limit: "100mb", extended: true }));
app.use(require("body-parser").json({ limit: "100mb" }));
app.use("/", routes);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

const PORT = 3000;
app.listen(PORT);
console.log("Application of detection facial running at: " + PORT);
