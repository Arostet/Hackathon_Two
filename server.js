const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require ("path");
const{router} = require('./routes/route.js');

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

// const __dirname = path.resolve();
app.use('/', express.static( __dirname+'/public'));
app.use('/user_login', express.static( __dirname+'/public/login.html'));
app.use('/user_register', express.static( __dirname+'/public/registration.html'));

app.listen(3001, () => {
  console.log("listening on 3001");
});

