import express from 'express';
import * as controller from '../controllers/product.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:productId', controller.show)

router.post('/', controller.create) 

router.put('/:productId', controller.update) 

router.delete('/:productId', controller.destroy)



export default router;
