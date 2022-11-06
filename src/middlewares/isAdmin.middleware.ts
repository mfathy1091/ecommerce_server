import { Request, Response, NextFunction } from 'express'

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

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if((req as AuthRequest).roleId === 1 ){
    next();
  } else {
    res.status(403).json("You are not Admin to do that action!");
  }
}

export default isAdmin;