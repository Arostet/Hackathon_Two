const express = require("express");
const router = express.Router();
<<<<<<< Updated upstream
const {
    registerNewUser,
    // logIn,
} = require('../controllers/user_controller.js');

router.post('/register', registerNewUser)

// router.post('/login', logIn)

module.exports = {
    router
}
=======
const { getExercise } = require();
>>>>>>> Stashed changes
