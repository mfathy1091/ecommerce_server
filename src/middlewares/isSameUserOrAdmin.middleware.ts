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

const isSameUserOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  if((req as AuthRequest).userId === Number(req.params.userId) || Number((req as AuthRequest).roleId) === 1){
    next();
  } else {
    res.status(403).json("You are not Authorized");
  }
}

export default isSameUserOrAdmin;