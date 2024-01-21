const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
    isUserExists,
    newUserInDB,
    getPassword,
    getUsersFromDB,
} = require ('../modules/user_module.js');


// function that gets information about user, checks if this username or email already exist
// if yes returns message about error
// if not encrypts the password and addes new user to DB
const registerNewUser = (req, res) => {
    const { username, password, email } = req.body;

    isUserExists(username, email).then(users => {
        if (users.length > 0){
            res.status(409).json({ msg: 'User with this username or email already exists' });
        } else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPass = bcrypt.hashSync(password, salt);

            newUserInDB(username, hashedPass, email)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({ msg: err.message });
                });
        }
    })
};

// function that check if user exists and if given password equal to password from DB (via bcrypt)
// if not respondes with corresponding message
const logIn = (req, res) => {
    const { username, password } = req.body;
    getPassword(username).then((user) => {
        if (user.length === 0) {
            res.status(404).json({ success: false, msg: 'User not found' });
        } else {
            const hashedPasswordFromDB = user[0].password;
            bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, msg: 'Internal server error' });
                } else {
                    if (result) {
                        res.json({ success: true, id: user[0].id});
                    } else {
                        res.status(401).json({ success: false, msg: 'Incorrect password' });
                    }
                }
            });
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    });
};

// get all user names from DB for direct messages
const getUserNames = (req, res) => {
    getUsersFromDB().then(users => {
        res.json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
    }


module.exports = {
    registerNewUser,
    logIn,
    getUserNames,
}