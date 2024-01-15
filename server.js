const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const{router} = require('./routes/route.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.listen(3001, () => {
  console.log("listening on 3001");
});

