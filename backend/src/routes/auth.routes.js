const express = require('express');

const router = express.Router();

const authController = require("../controllers/auth.controller");
const {validateRegister} = require('../middlewares/auth.middeware');

router.post('/register', validateRegister, authController.register);



module.exports = router;