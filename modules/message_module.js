const { db } = require("../config/db_users.js");

const newMessageDB = (id, message, bodyparts) => {
  try {
    return db("messages")
      .insert({
        user_id: id,
        message: message,
        bodyparts: bodyparts,
      })
      .returning("*");
  } catch (error) {
    console.log(error);
  }
};

const getMessagesDB = () => {
  return db("messages").select("*").returning("*");
};

module.exports = {
  newMessageDB,
  getMessagesDB,
};
