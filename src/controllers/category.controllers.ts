import { NextFunction, Request, Response } from 'express'
import CategoryModel from '../models/Category'

import { BaseCategory } from '../models/Category'

const categoryModel = new CategoryModel()

const index = async (req: Request, res: Response, next:NextFunction) => {
    // Validate params/queries

    try {
        const categories = await categoryModel.index()
        res.json(categories)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const category = await categoryModel.show(Number(req.params.categoryId))
        res.json(category)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const category: Omit<BaseCategory, 'id'> = {
        parent_category_id: Number(req.body.parent_category_id),
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        is_active: req.body.is_active || true,
    }
    try {
        const newEmployee = await categoryModel.create(category)
        res.status(201)
        res.json(newEmployee)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const category: Omit<BaseCategory, "id"> = {
        parent_category_id: Number(req.body.parent_category_id),
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        is_active: req.body.is_active || true,
    }
    try {
        const newEmployee = await categoryModel.update(Number(req.params.categoryId), category)
        res.json(newEmployee)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedEmployee = await categoryModel.delete(Number(req.params.categoryId))
        res.json(deletedEmployee)
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