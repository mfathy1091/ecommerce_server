import { NextFunction, Request, Response } from 'express'
import Attribute, { BaseAttribute } from '../models/Attribute'
import AttributeValue, { BaseAttributeValue } from '../models/AttributeValue'

const attributeModel = new Attribute()

const index = async (req: Request, res: Response, next:NextFunction) => {
    // Validate params/queries

    try {
        const attributes = await attributeModel.index()
        res.json(attributes)
    } catch (err) {
        next(err)
    }
}

const getAll = async (req: Request, res: Response, next:NextFunction) => {
    // Validate params/queries

    try {
        const attributes = await attributeModel.getAll()
        res.json(attributes)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const attribute = await attributeModel.show(Number(req.params.attributeId))
        res.json(attribute)
    } catch (err) {
        next(err)
    }
}

const getOne = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const attribute = await attributeModel.getOne(Number(req.params.attributeId))
        res.json(attribute)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const attribute: Omit<BaseAttribute, 'id'> = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        is_active: req.body.is_active || true,
    }
    console.log(attribute)
    try {
        const newAttribute = await attributeModel.create(attribute)
        res.status(201)
        res.json(newAttribute)
    } catch(err) {
        next(err) 
    }
}

// const createValue = async (req: Request, res: Response, next:NextFunction) => {
//     const attributeValue: Omit<BaseAttributeValue, 'id'> = {
//         name: req.body.name,
//         slug: req.body.slug,
//         image: req.body.image,
//         is_active: req.body.is_active || true,
//     }
//     console.log(attributeValue)
//     try {
//         const newAttribute = await attributeValueModel.create(attributeValue)
//         res.status(201)
//         res.json(newAttribute)
//     } catch(err) {
//         next(err) 
//     }
// }

const update = async (req: Request, res: Response, next:NextFunction) => {
    const attribute: Omit<BaseAttribute, "id"> = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        is_active: req.body.is_active || true,
    }
    try {
        const newAttribute = await attributeModel.update(Number(req.params.attributeId), attribute)
        res.json(newAttribute)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedAttribute = await attributeModel.delete(Number(req.params.attributeId))
        res.json(deletedAttribute)
    } catch (err) {
        next(err)
    }
}

export {
    index,
    getAll,
    show,
    getOne,
    create,
    update,
    destroy,
    // createValue
}