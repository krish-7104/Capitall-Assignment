import express from 'express';
import { ForgetPasswordHandler, GetUserHandler, LoginHandler, LogoutHandler, RegisterHandler, UpdatePasswordHandler } from '../Controller/user.controller.js';

const router = express.Router();

router.post('/login', LoginHandler);
router.post('/register', RegisterHandler);
router.post('/forget-password', ForgetPasswordHandler);
router.post('/verify-token', UpdatePasswordHandler);
router.post('/get-user', GetUserHandler);
router.post('/logout', LogoutHandler);

export default router;
