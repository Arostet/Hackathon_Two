const { db } = require("../config/db_users.js");
//db query to insert data into messages table in elephant server
const newMessageDB = (id, message, bodyparts, to_user) => {
  try {
    return db("messages")
      .insert({
        user_id: id,
        message: message,
        bodyparts: bodyparts,
        to_user: to_user,
      })
      .returning("*");
  } catch (error) {
    console.log(error);
  }
};
//db query using the id in users table and user_id in messages to join tables and return relevant column data
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
