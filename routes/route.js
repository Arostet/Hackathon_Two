const express = require("express");
const router = express.Router();
const { registerNewUser, logIn, getUserNames } = require("../controllers/user_controller.js");
const {
  newMessage,
  getMessages,
} = require("../controllers/message_controller.js");

//post users data during registration and login
router.post("/register", registerNewUser);
router.post("/login", logIn);

//get all users for list of users for direct messages
router.get("/users", getUserNames);

//post message and get all messages for render them on the community page
router.post("/messages", newMessage);
router.get("/messages", getMessages);

module.exports = {
  router,
};
