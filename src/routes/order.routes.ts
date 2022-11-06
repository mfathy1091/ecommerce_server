import express from 'express';
import * as controller from '../controllers/order.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:orderId', controller.show)

router.post('/', controller.create) 

router.put('/:orderId', controller.update) 

router.delete('/:orderId', controller.destroy)

router.post('/:orderId/products', controller.addProduct)


export default router;
