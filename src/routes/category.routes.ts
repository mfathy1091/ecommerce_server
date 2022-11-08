import express from 'express';
import * as controller from '../controllers/category.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:categoryId', controller.show)

router.post('/', controller.create) 

router.put('/:categoryId', controller.update) 

router.delete('/:categoryId', controller.destroy)


export default router;
