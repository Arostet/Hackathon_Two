const {db} = require('../config/db_users.js');

// check if user with given name or email exists (for regisrer new user)
const isUserExists = (username, email) => {
  return db('users').where({ username }).orWhere({ email });
};

// add new user to DB
const newUserInDB =(username, hashedPass, email) =>{
    try{
        return db('users').insert(
            {
              username:username,
              email:email,
              password:hashedPass
            }
          )
          .returning('*')
    }
    catch (error){
        console.log(error);
    }
}

// get password of user (for log in)
const getPassword = (enteredUsername) => {
  return db('users').select('password', 'id').where({username : enteredUsername})
};

// get all users from DB (for direct messages)
const getUsersFromDB = () => {
  return db('users').select('username', 'id');
}


module.exports = {
  isUserExists,
  newUserInDB,
  getPassword,
  getUsersFromDB,
}