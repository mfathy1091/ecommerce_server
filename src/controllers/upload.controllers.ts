import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
})


const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {  
  try {
    // get file
    const file = req.file

    // upload to cloudinary
    cloudinary.uploader
      .upload(
        file?.path as string,
        
        { folder: "avatar", width: 200, height: 200, crop: 'fill' },
        (err, result) => {
          if (err) {
            // throw err;
            fs.unlinkSync(file?.path as string)
          }
          console.log(file)

          res.status(200).json({
            msg: "Uploaded successfully",
            avatarUrl: result?.secure_url
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
  uploadAvatar
}
