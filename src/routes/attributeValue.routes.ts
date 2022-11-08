import express from 'express';
import * as controller from '../controllers/attributeValue.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:attributeValueId', controller.show)

router.post('/', controller.create) 

router.put('/:attributeValueId', controller.update) 

router.delete('/:attributeValueId', controller.destroy)


export default router;
