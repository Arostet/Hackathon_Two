const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
    newUserInDB,
    getPassword,
} = require ('../modules/user_module.js');



const registerNewUser = (req, res) => {
    console.log('Start registerNewUser');
    const {username, password, email} = req.body;
    console.log('get data', username, password, email);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt)
    console.log('hashed password', hashedPass);
    newUserInDB(username, hashedPass, email)
        .then(data => {
            console.log('user created',data)
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({msg:'can not create a user'})
        });
}


const logIn = (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    getPassword(username).then((user) => {
        if (user.length === 0) {
            res.status(404).json({ success: false, msg: 'User not found' });
        } else {
            console.log(user[0]);
            const hashedPasswordFromDB = user[0].password;
            console.log(hashedPasswordFromDB);
            bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
                if (err) {
                    console.error('Error during password comparison:', err);
                    res.status(500).json({ success: false, msg: 'Internal server error' });
                } else {
                    if (result) {
                        res.json({ success: true, msg: 'Login successful' });
                    } else {
                        res.status(401).json({ success: false, msg: 'Incorrect password' });
                    }
                }
            });
        }
    }).catch((error) => {
        console.error('Error during user retrieval:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    });
};



module.exports = {
    registerNewUser,
    logIn,
}