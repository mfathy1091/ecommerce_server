import express from 'express';
import upload from '../middlewares/upload.middleware'
import uploadImage from '../middlewares/uploadImage'
import * as uploadController from '../controllers/upload.controllers'
import verifyToken from '../middlewares/verifyToken.middleware'
import isAdmin from '../middlewares/isAdmin.middleware';
import multer, { FileFilterCallback } from 'multer'

const router = express.Router();

router.post('/avatar', verifyToken, uploadImage, upload, uploadController.uploadAvatar)
// router.post('/avatar', verifyToken, isAdmin, uploadImage, upload, uploadController.uploadAvatar)

export default router;