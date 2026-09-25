import { Router } from "express";
import {getUser, updateUser } from '../controllers/userController';

const router = Router();

router.get('/user', getUser);
router.post('/user', updateUser);

export default router;