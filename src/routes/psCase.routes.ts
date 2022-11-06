import express from 'express';
import * as psCaseController from '../controllers/psCase.controllers'
import * as beneficiaryController from '../controllers/beneficiary.controllers'

const router = express.Router();

router.get('/', psCaseController.index)

router.get('/:psCaseId', psCaseController.show)

router.get('/:psCaseId/details', psCaseController.getOne)

router.post('/', psCaseController.create)

router.put('/:psCaseId', psCaseController.update) 

router.delete('/:psCaseId', psCaseController.destroy)


router.post('/:psCaseId/beneficiaries', psCaseController.addBeneficiary)
router.delete('/:psCaseId/beneficiaries/:beneficiaryId', psCaseController.addBeneficiary)
router.put('/:psCaseId/beneficiaries/:beneficiaryId', psCaseController.updateIsDirect)

router.get('/:psCaseId/beneficiaries', beneficiaryController.getBeneficiariesInPsIntake)
export default router;
