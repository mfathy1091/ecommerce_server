import { NextFunction, Request, Response } from 'express'
import RoleModel from '../models/Role'

import { BaseRole } from '../models/Role'

const roleModel = new RoleModel()

const index = async (_req: Request, res: Response, next:NextFunction) => {
    try {
        const roles = await roleModel.index()
        res.json(roles)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const role = await roleModel.show(Number(req.params.roleId))
        res.json(role)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const role: Omit<BaseRole, 'id'> = {
        role_name: req.body.role_name,
    }
    try {
        const newPsService = await roleModel.create(role)
        res.status(201)
        res.json(newPsService)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const role: Omit<BaseRole, "id"> = {
        role_name: req.body.role_name,
    }
    try {
        const updatedPsService = await roleModel.update(Number(req.params.roleId), role)
        res.json(updatedPsService)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedPsService = await roleModel.delete(Number(req.params.roleId))
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