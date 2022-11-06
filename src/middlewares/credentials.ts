import allowedOrigins from '../config/allowedOrigins'
import { Request, Response, NextFunction } from 'express'

const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    
    // (1) if the origin that sending the request is i our alloed list
    if(allowedOrigins.includes(origin as string)) {
        // (2) set this header in the response, as CORS will look for it
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
}

export default credentials;