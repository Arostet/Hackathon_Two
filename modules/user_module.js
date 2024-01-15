const {db} = require('../config/db_users.js');


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
        console.log(error)
    }
}


// const checkUser = (enteredUsername) => {
//   return db('hashpwd').select('password').where({username : enteredUsername})
// };


module.exports = {
    newUserInDB,
    // checkUser,
}