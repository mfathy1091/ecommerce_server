import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

interface MulterRequest extends Request {
    file: any;
}

export default (req: Request, res: Response, next:NextFunction) => {
    // check file exists
    if(typeof (req as MulterRequest).file === 'undefined' || typeof req.body === 'undefined')
    return res.status(400).json({msg: "Problem with uploading image"})
    
    // use upload folder
    let image = (req as MulterRequest).file.path;

    // define file type
    if (
        !(req as MulterRequest).file.mimetype.includes('jpeg') && 
        !(req as MulterRequest).file.mimetype.includes('jpg') &&
        !(req as MulterRequest).file.mimetype.includes('png')
    ){
        // remove file from upload folder
        fs.unlinkSync(image);
        return res.status(400).json({msg: "This file is not supported"})
    }
    
    // define file size
    if((req as MulterRequest).file.size > 1024 * 1024) {
        // remove file from upload folder
        fs.unlinkSync(image)
        return res.status(400).json({msg: "This file is too large (Max: 1MB)"})
    }
    // success
    next();
}