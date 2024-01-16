const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const { router } = require("./routes/route.js");

dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use("/", express.static(__dirname + "/public"));
app.use("/user_login", express.static(__dirname + "/public/login.html"));
app.use(
  "/user_register",
  express.static(__dirname + "/public/registration.html")
);
app.use("/hello", express.static(__dirname + "/public/hello_page.html"));
app.use("/user_page", express.static(__dirname + "/public/user_page.html"));

app.listen(3001, () => {
  console.log("listening on 3001");
});
