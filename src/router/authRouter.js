const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router
    .route('/author')
    .post(authController.createAuthor);

router
    .route('/login')
    .post(authController.loginAuthor);


module.exports = router;


