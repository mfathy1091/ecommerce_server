import express from 'express';
import upload from '../middlewares/upload.middleware'
import uploadImage from '../middlewares/uploadImage'
import * as uploadController from '../controllers/upload.controllers'
import verifyToken from '../middlewares/verifyToken.middleware'

const router = express.Router();

router.post('/avatar', uploadImage, upload, uploadController.uploadAvatar)

export default router;