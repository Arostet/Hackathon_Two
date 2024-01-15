const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3001, () => {
  console.log("listening on 3001");
});
///asdkjhdasjhadjdsakjddhhdjksahdkjhsakjdskjdhkjaskdshkhkjkhsdahjkhsadhjskj
