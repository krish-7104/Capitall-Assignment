const express = require('express');
const {
    ForgetPasswordHandler,
    GetUserAccountDetails,
    GetUserHandler,
    LoginHandler,
    LogoutHandler,
    RegisterHandler,
    UpdatePasswordHandler
} = require('../Controller/user.controller.js');

const router = express.Router();

router.post('/login', LoginHandler);
router.post('/register', RegisterHandler);
router.post('/forget-password', ForgetPasswordHandler);
router.post('/verify-token', UpdatePasswordHandler);
router.post('/get-user', GetUserHandler);
router.post('/logout', LogoutHandler);

router.get('/user-details/:id', GetUserAccountDetails);

module.exports = router;
