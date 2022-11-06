import { NextFunction, Request, Response } from 'express'
import PsServiceModel from '../models/PsService'

import { BasePsService } from '../models/PsService'

const psServiceModel = new PsServiceModel()

const index = async (_req: Request, res: Response, next:NextFunction) => {
    try {
        const psServices = await psServiceModel.index()
        res.json(psServices)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const psService = await psServiceModel.show(Number(req.params.psServiceId))
        res.json(psService)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const psService: Omit<BasePsService, 'id'> = {
        service_name: req.body.service_name,
        service_date: req.body.service_date,
        beneficiary_id: Number(req.body.beneficiary_id),
        ps_case_id: Number(req.body.ps_case_id),
    }
    try {
        const newPsService = await psServiceModel.create(psService)
        res.status(201)
        res.json(newPsService)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const psService: Omit<BasePsService, "id"> = {
        service_name: req.body.service_name,
        service_date: req.body.service_date,
        beneficiary_id: Number(req.body.beneficiary_id),
        ps_case_id: Number(req.body.ps_case_id),
    }
    try {
        const updatedPsService = await psServiceModel.update(Number(req.params.psServiceId), psService)
        res.json(updatedPsService)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedPsService = await psServiceModel.delete(Number(req.params.psServiceId))
        res.json(deletedPsService)
    } catch (err) {
        next(err)
    }
}

export {
    index,
    show,
    create,
    update,
    destroy,
}