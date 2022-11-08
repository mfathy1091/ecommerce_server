import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  userId: number;
  roleId: number;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: number;
    roleId: number;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // check ac token
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json("Authorization faild: Auth header is not set!")
    }

    // (1) Verify the token
    const token = authHeader.split(' ')[1]
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as unknown as string,
      (err, decoded) => {
        if (err){ //invalid token
          return res.status(401).json('Authorization faild: Access token is invalid / missing');
        }  

        // (2) if verified, attached userId and roleId to the next middleware / controller
        (req as AuthRequest).userId = (decoded as jwt.JwtPayload).userId;
        (req as AuthRequest).roleId = (decoded as jwt.JwtPayload).roleId;
        next();
      })
  } catch (err) {
    return res.status(401).send(`Authorization faild: ${(err as Error).message}`)
  }
}



export default verifyToken;