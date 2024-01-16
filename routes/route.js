const express = require("express");
const router = express.Router();
const { registerNewUser, logIn, getUserNames } = require("../controllers/user_controller.js");
const {
  newMessage,
  getMessages,
} = require("../controllers/message_controller.js");
router.post("/register", registerNewUser);
router.post("/login", logIn);
router.get("/users", getUserNames);
router.post("/messages", newMessage);
router.get("/messages", getMessages);

module.exports = {
  router,
};
