import express from 'express';
import verifyAuthToken from '../middlewares/verifyToken.middleware'
import * as controller from '../controllers/brand.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:brandId', controller.show)

router.post('/', controller.create) 

router.put('/:brandId', controller.update) 

router.delete('/:brandId', controller.destroy)


export default router;
