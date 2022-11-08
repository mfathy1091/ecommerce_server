import express from 'express';
import * as controller from '../controllers/attribute.controllers'

const router = express.Router();

router.get('/', controller.getAll)

router.get('/:attributeId', controller.getOne)

router.post('/', controller.create) 

router.put('/:attributeId', controller.update) 

router.delete('/:attributeId', controller.destroy)


// router.post('/:attributeId/values', controller.createValue)

export default router;
