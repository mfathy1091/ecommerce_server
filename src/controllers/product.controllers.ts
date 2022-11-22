import { NextFunction, Request, Response } from 'express'
import ProductModel, { Product } from '../models/Product'

const productModel = new ProductModel()

const index = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query);

  try {
    if (req.query.constructor === Object && Object.keys(req.query).length === 0) {
      const products = await productModel.index()
      res.json(products)
    } else {
      if (!req.query.page) {
      
        const query = {
          categorySlug: req.query.categorySlug,
        }
  
        const products = await productModel.filter(query)
        res.json(products)
      }
      const query = {
        page: parseInt(req.query.page as string),
        limit: parseInt(req.query.limit as string) || 5,
        searchKeyword: req.query.searchKeyword as string || "",
      }

      const products = await productModel.getAll(query)
      res.json(products)
    }

  } catch (err) {
    next(err)
  }
}


const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.show(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const product: Product = {
    brand_id: Number(req.body.brandId),
    category_id: Number(req.body.categoryId),
    name: req.body.name,
    is_discontinued: false,
    // is_discontinued: req.body.is_discontinued,
    description: req.body.description,
    images: req.body.images,
    attributeValues: req.body.attributeValues
  }
  try {
    const newProduct = await productModel.create(product)
    res.status(201)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const product: Omit<Product, "id"> = {
    brand_id: Number(req.body.brandId),
    category_id: Number(req.body.categoryId),
    name: req.body.name,
    is_discontinued: req.body.is_discontinued || false,
    description: req.body.description,
    images: req.body.images,
    attributeValues: req.body.attributeValues,
  }
  try {
    const newProduct = await productModel.update(req.params.productId, product)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
}

const destroy = async (req: Request, res: Response, next: NextFunction) => {
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