import express from 'express';
import verifyToken from '../middlewares/verifyToken.middleware'
import { beneficiarySchema } from '../schema/beneficiary.schema';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import * as beneficiaryController from '../controllers/beneficiary.controllers'

const router = express.Router();

router.get('/', verifyToken, beneficiaryController.getAll)

router.get('/:beneficiaryId', verifyToken, beneficiaryController.getOne)

router.post('/', verifyToken, beneficiarySchema, validateRequestSchema, beneficiaryController.createOne) 

router.put('/:beneficiaryId', verifyToken, beneficiaryController.updateOne) 

router.delete('/:beneficiaryId', verifyToken, beneficiaryController.deleteOne)

//router.post('/:beneficiaryId/ps-services', verifyToken, beneficiaryController.addPsService)



export default router;
