import { NextFunction, Request, Response } from 'express'
import ProductModel, { Product } from '../models/ProductModel'

const productModel = new ProductModel()

const index = async (_req: Request, res: Response, next:NextFunction) => {
    const query = {
        page: parseInt(_req.query.page as string),
        limit: parseInt(_req.query.limit as string) || 5,
        stringToSearch: _req.query.stringToSearch as string || "",
    }

    try {
        const products = await productModel.index(query)
        res.json(products)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const product = await productModel.show(req.params.productId)
        res.json(product)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const product: Product = {
        product_name: req.body.productName,
        category_id: req.body.categoryId,
        description: req.body.description,
        product_img: req.body.productImg,
        price: req.body.price,
    }
    try {
        const newProduct = await productModel.create(product)
        res.status(201)
        res.json(newProduct)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const product: Omit<Product, "id"> = {
        product_name: req.body.productName,
        category_id: req.body.categoryId,
        description: req.body.description,
        product_img: req.body.productImg,
        price: req.body.price,
    }
    try {
        const newProduct = await productModel.update(req.params.productId, product)
        res.json(newProduct)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deleted = await productModel.delete(req.params.productId)
        res.json(deleted)
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