import { NextFunction, Request, Response } from 'express'
import Type, { BaseType } from '../models/Type'

const typeModel = new Type()

const index = async (req: Request, res: Response, next:NextFunction) => {
    // Validate params/queries

    try {
        const types = await typeModel.index()
        res.json(types)
    } catch (err) {
        next(err)
    }
}


const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const type = await typeModel.show(Number(req.params.typeId))
        res.json(type)
    } catch (err) {
        next(err)
    }
}

const getOne = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const type = await typeModel.getOne(Number(req.params.typeId))
        res.json(type)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const type: Omit<BaseType, 'id'> = {
        name: req.body.name,
        slug: req.body.slug,
    }
    console.log(type)
    try {
        const newType = await typeModel.create(type)
        res.status(201)
        res.json(newType)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const type: Omit<BaseType, "id"> = {
        name: req.body.name,
        slug: req.body.slug,
    }
    try {
        const newType = await typeModel.update(Number(req.params.typeId), type)
        res.json(newType)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedType = await typeModel.delete(Number(req.params.typeId))
        res.json(deletedType)
    } catch (err) {
        next(err)
    }
}

export {
    index,
    show,
    getOne,
    create,
    update,
    destroy,
    // createValue
}