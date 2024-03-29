import express, { Request, Response } from 'express';
import roleRouter from './role.routes';
import categoryRouter from './category.routes'
import userRouter from './user.routes';
import orderRouter from './order.routes';
import productRouter from './product.routes';
import uploadRouter from './upload.routes'
import authRouter from './auth.routes'
import attributeRouter from './attribute.routes'
import attributeValueRouter from './attributeValue.routes'
import brandRouter from './brand.routes'
import typeRouter from './type.routes'

import app from './../server'
import verifyToken from '../middlewares/verifyToken.middleware';
import isAdmin from '../middlewares/isAdmin.middleware';


const router = express.Router();

router.get('', function (req: Request, res: Response) {
  res.send('Server is running!') 
})

router.use('/auth', authRouter)
// this will receive the cookie that has the refresh token
// and issue a new access token when it is expired

router.use('/categories', categoryRouter)
router.use('/attributes', attributeRouter)
router.use('/brands', brandRouter)
router.use('/types', typeRouter)
router.use('/attribute-values', attributeValueRouter)
// app.use(verifyToken);

router.use('/roles', verifyToken, roleRouter)
router.use('/users', verifyToken, userRouter)
router.use('/products', productRouter)
router.use('/orders', verifyToken, orderRouter)
router.use('/upload', verifyToken, uploadRouter)


export default router;
