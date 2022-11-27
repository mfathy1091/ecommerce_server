import express from 'express';
import verifyAuthToken from '../middlewares/verifyToken.middleware'
import * as controller from '../controllers/type.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:typeId', controller.show)

router.post('/', controller.create) 

router.put('/:typeId', controller.update) 

router.delete('/:typeId', controller.destroy)


export default router;
