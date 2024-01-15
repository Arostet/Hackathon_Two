const {db} = require('../config/db_users.js');

const isUserExists = (username, email) => {
  return db('users').where({ username }).orWhere({ email });
};


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


const getPassword = (enteredUsername) => {
  return db('users').select('password').where({username : enteredUsername})
};


module.exports = {
  isUserExists,
  newUserInDB,
  getPassword,
}