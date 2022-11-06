import { NextFunction, Request, Response } from 'express'
import ServiceAssignmentModel, { BaseServiceAssignment } from '../models/ServiceAssignment'

const serviceAssignmentModel = new ServiceAssignmentModel()

const index = async (_req: Request, res: Response, next:NextFunction) => {
    try {
        const serviceAssignments = await serviceAssignmentModel.index()
        res.json(serviceAssignments)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const serviceAssignment = await serviceAssignmentModel.show(Number(req.params.seviceAssignmentId))
        res.json(serviceAssignment)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const serviceAssignment: Omit<BaseServiceAssignment, 'id'> = {
        service_id: Number(req.body.service_id),
        beneficiary_id: Number(req.body.beneficiary_id),
        ps_intake_id: Number(req.body.ps_intake_id),
        service_date: req.body.service_date,
    }
    
    try {
        const addedServiceAssignment = await serviceAssignmentModel.create(serviceAssignment)
        res.json(addedServiceAssignment)
        res.status(201)
    } catch(err) {
        next(err)    
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const serviceAssignment: Omit<BaseServiceAssignment, 'id'> = {
        service_id: Number(req.body.service_id),
        beneficiary_id: Number(req.body.beneficiary_id),
        ps_intake_id: Number(req.body.ps_intake_id),
        service_date: req.body.service_date,
    }
    try {
        const updatedServiceAssignment = await serviceAssignmentModel.update(Number(req.params.serviceAssignmentId), serviceAssignment)
        res.json(updatedServiceAssignment)
    } catch(err) {
        next(err)    
    }
}
const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedServiceAssignment = await serviceAssignmentModel.delete(Number(req.params.serviceAssignmentId))
        res.json(deletedServiceAssignment)
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








