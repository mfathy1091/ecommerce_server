import express from 'express';

import * as controller from '../controllers/refreshToken.controllers'

const router = express.Router();

router.get('/', controller.refreshToken)


export default router;
