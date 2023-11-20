const express = require("express");
const bodyParser = require("body-parser");
const router = require("./app/routes/router");
const ejs = require("ejs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use("/", router);
app.use("/login", router);
app.use("/register", router);
app.use("/about", router);
app.use("/faq", router);

Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log(`App is listening on ${Port}...`);
});
