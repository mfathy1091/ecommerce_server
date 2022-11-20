import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import multer, { FileFilterCallback } from 'multer'


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})


const streamUpload = async (req: Request, res: Response, next: NextFunction) => {  
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if(result) {
        resolve(result);
      } else {
        reject (error);
      }
    });

  })
}

const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {  
  try {
    // get file
    const file = req.file

    // upload to cloudinary
    cloudinary.uploader
      .upload(
        file?.path as string,
        
        { folder: "avatar", width: 1500, height: 1000, crop: 'fill' },
        (err, result) => {
          if (err) {
            // throw err;
            fs.unlinkSync(file?.path as string)
          }
          console.log(file)

          res.status(200).json({
            msg: "Uploaded successfully",
            url: result?.secure_url
          })
        }
      )
      .then(result => console.log(result));

  } catch (err) {
    console.log(err)
    next(err)
  }
}


export {
  streamUpload,
  uploadAvatar
}
