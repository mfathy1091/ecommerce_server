import { NextFunction, Request, Response } from 'express'
import Brand, { BaseBrand } from '../models/Brand'

const brandModel = new Brand()

const index = async (req: Request, res: Response, next:NextFunction) => {
    // Validate params/queries

    try {
        const brands = await brandModel.index()
        res.json(brands)
    } catch (err) {
        next(err)
    }
}


const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const brand = await brandModel.show(Number(req.params.brandId))
        res.json(brand)
    } catch (err) {
        next(err)
    }
}

const getOne = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const brand = await brandModel.getOne(Number(req.params.brandId))
        res.json(brand)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const brand: Omit<BaseBrand, 'id'> = {
        name: req.body.name,
        slug: req.body.slug,
    }
    console.log(brand)
    try {
        const newBrand = await brandModel.create(brand)
        res.status(201)
        res.json(newBrand)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const brand: Omit<BaseBrand, "id"> = {
        name: req.body.name,
        slug: req.body.slug,
    }
    try {
        const newBrand = await brandModel.update(Number(req.params.brandId), brand)
        res.json(newBrand)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedBrand = await brandModel.delete(Number(req.params.brandId))
        res.json(deletedBrand)
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