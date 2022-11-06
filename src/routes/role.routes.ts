import express from 'express';
import verifyAuthToken from '../middlewares/verifyToken.middleware'
import * as roleController from '../controllers/role.controllers'

const router = express.Router();

router.get('/', roleController.index)

router.get('/:roleId', roleController.show)

router.post('/', roleController.create) 

router.put('/:roleId', roleController.update) 

router.delete('/:roleId', roleController.destroy)


export default router;
