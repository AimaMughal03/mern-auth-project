const express = require("express");
const router = express.Router();


const {register, login, getUser} = require('../controllers/user');

const auth = require('../middleware/auth');

router.post('/register',register);

router.post('/login', login);

router.get('/getUser',auth, getUser);

module.exports = router;