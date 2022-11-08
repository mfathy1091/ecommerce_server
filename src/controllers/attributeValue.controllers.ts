import { NextFunction, Request, Response } from 'express'
import AttributeValue, { BaseAttributeValue } from '../models/AttributeValue'

const attributeValueModel = new AttributeValue()

const index = async (req: Request, res: Response, next:NextFunction) => {
    // Validate params/queries

    try {
        const attributeValues = await attributeValueModel.index()
        res.json(attributeValues)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const attributeValue = await attributeValueModel.show(Number(req.params.attributeValueId))
        res.json(attributeValue)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const attributeValue: Omit<BaseAttributeValue, 'id'> = {
        attribute_id: Number(req.body.attributeId),
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        is_active: req.body.is_active || true,
    }
    console.log(attributeValue);
    try {
        const newAttributeValue = await attributeValueModel.create(attributeValue)
        res.status(201)
        res.json(newAttributeValue)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const attributeValue: Omit<BaseAttributeValue, "id"> = {
        attribute_id: Number(req.body.attributeId),
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        is_active: req.body.is_active || true,
    }
    try {
        const newAttributeValue = await attributeValueModel.update(Number(req.params.attributeValueId), attributeValue)
        res.json(newAttributeValue)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedAttributeValue = await attributeValueModel.delete(Number(req.params.attributeValueId))
        res.json(deletedAttributeValue)
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