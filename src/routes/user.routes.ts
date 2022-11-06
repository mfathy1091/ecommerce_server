import express from 'express';
import isSameUserOrAdmin from '../middlewares/isSameUserOrAdmin.middleware';
import isAdmin from '../middlewares/isAdmin.middleware';

import * as controller from '../controllers/user.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:userId', controller.show)

router.put('/:userId/password', isSameUserOrAdmin, controller.resetPassword)

router.put('/:userId', isSameUserOrAdmin, controller.update)

router.delete('/:userId', isAdmin, controller.destroy)


export default router;
