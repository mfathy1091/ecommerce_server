import { NextFunction, Request, Response } from 'express'
import BeneficiaryModel from '../models/Beneficiary'
import BeneficiaryService from '../services/beneficiaryService'

import { BaseBeneficiary } from '../models/Beneficiary'

const beneficiaryModel = new BeneficiaryModel()
const beneficiaryService = new BeneficiaryService()

const getAll = async (_req: Request, res: Response, next:NextFunction) => {
    const query = {
        page: parseInt(_req.query.page as string),
        limit: parseInt(_req.query.limit as string) || 5,
        stringToSearch: _req.query.stringToSearch as string || "",
    }
    try {
        const data = await beneficiaryModel.index(query)
        res.json(data)
    } catch (err) {
        next(err)
    }
}


const getBeneficiariesInPsIntake = async (_req: Request, res: Response, next:NextFunction) => {
    try {
        const beneficiaries = await beneficiaryService.getBeneficiariesInPsIntake(Number(_req.params.psIntakeId))
        res.json(beneficiaries)
    } catch (err) {
        next(err)
    }
}

const getOne = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const beneficiary = await beneficiaryModel.show(Number(req.params.beneficiaryId))
        res.json(beneficiary)
    } catch (err) {
        next(err)
    }
}

const createOne = async (req: Request, res: Response, next:NextFunction) => {
    const beneficiary: Omit<BaseBeneficiary, 'id'> = {
        full_name: req.body.fullName,
        file_number: req.body.fileNumber,
        individual_number: req.body.individualNumber,
        passport_number: req.body.passportNumber,
    }
    try {
        const newBeneficiary = await beneficiaryModel.create(beneficiary)
        res.status(201)
        res.json(newBeneficiary)
    } catch(err) {
        next(err) 
    }
}

const updateOne = async (req: Request, res: Response, next:NextFunction) => {
    const beneficiary: Omit<BaseBeneficiary, "id"> = {
        full_name: req.body.fullName,
        file_number: req.body.fileNumber,
        individual_number: req.body.individualNumber,
        passport_number: req.body.passportNumber,
    }
    try {
        const updatedBeneficiary = await beneficiaryModel.update(Number(req.params.beneficiaryId), beneficiary)
        res.json(updatedBeneficiary)
    } catch(err) {
        next(err)    
    }
}

const deleteOne = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedBeneficiary = await beneficiaryModel.delete(Number(req.params.beneficiaryId))
        res.json(deletedBeneficiary)
    } catch (err) {
        next(err)
    }
}



export {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    getBeneficiariesInPsIntake
}