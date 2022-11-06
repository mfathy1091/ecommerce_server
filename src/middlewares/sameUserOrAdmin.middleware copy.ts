import { Request, Response, NextFunction } from 'express'

interface AuthRequest extends Request {
  user: any;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    user: {};
  }
}

const isSameUser = (req: Request, res: Response, next: NextFunction) => {
  console.log('params.userId')
  console.log(Number(req.params.userId))
  console.log('token.user.id')
  console.log((req as AuthRequest).user.id)
  if((req as AuthRequest).user.id === Number(req.params.userId)){
    next();
  } else {
    res.status(403).json("You are not the owner of this resource to do that action!");
  }
}

export default isSameUser;