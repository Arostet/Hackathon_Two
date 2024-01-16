const { db } = require("../config/db_users.js");

const newMessageDB = (id, message, bodyparts, to_user) => {
  try {
    return db("messages")
      .insert({
        user_id: id,
        message: message,
        bodyparts: bodyparts,
        to_user: to_user
      })
      .returning("*");
  } catch (error) {
    console.log(error);
  }
};

const getMessagesDB = () => {
  return db("messages")
    .select("username", "message", "time", "bodyparts", "to_user")
    .innerJoin("users", "messages.user_id", "users.id")
    .returning("*");
};

module.exports = {
  newMessageDB,
  getMessagesDB,
};
