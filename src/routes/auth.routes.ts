import express from 'express';
import { loginSchema } from '../schema/login.schema';
import { registerSchema } from '../schema/register.schema';
import verifyToken from '../middlewares/verifyToken.middleware';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import * as controller from '../controllers/auth.controllers'

const router = express.Router();

router.post('/register', registerSchema, validateRequestSchema, controller.register)
// router.post('/activation', controller.activation)
router.post('/login', controller.login)
router.get('/user', verifyToken, controller.getAuthUser)
router.post('/logout', controller.logout)

export default router;
