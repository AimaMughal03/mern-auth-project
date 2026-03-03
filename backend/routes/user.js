const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");


const {register, login, getUser} = require('../controllers/user');

const auth = require('../middleware/auth');

router.post('/register', upload.single("image"), register);

router.post('/login', login);

router.get('/getUser',auth, getUser);

module.exports = router;