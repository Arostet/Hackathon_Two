const { newMessageDB, getMessagesDB } = require("../modules/message_module.js");

const newMessage = (req, res) => {
  const { id, message, bodyparts, to_user} = req.body;
  newMessageDB(id, message, bodyparts, to_user)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ msg: err.message });
    });
};

const getMessages = (req, res) => {
  getMessagesDB()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};
module.exports = {
  newMessage,
  getMessages,
};
