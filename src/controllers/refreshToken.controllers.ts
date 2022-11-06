import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import * as authService from '../services/authService'
import createToken from '../helpers/createToken'

interface AuthRequest extends Request {
  user: any;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    username: string;
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
		// (1) get the refreshToken from the httpOnly cookie
		const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ msg: "missing refresh token" });
    const refreshToken = cookies.jwt;

    // (2) Check if user exists
    const user  = await authService.getUserByRefreshToken(refreshToken);
		if (!user) return res.status(401).json({ msg: "user are not found" }); //Forbidden 
		
    // (3) Verify the refreshToken
    jwt.verify(
      refreshToken as string,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, decoded) => {
        if (err || user.username !== (decoded as jwt.JwtPayload).username) return res.sendStatus(403); //invalid token
    })
      // (4) create access token
      const payload = { 
        userId: Number(user.id),
        roleId: Number(user.role_id) 
      }
      const accessToken = createToken.accessToken(payload);
      
      // (5) omit user's sensitive data before sending it
      const userData = {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        email: user.email,
        avatarUrl: user.avatar_url,
        roleId: user.role_Id,
      }

      // (6) send back access token and user
      res.json({ accessToken: accessToken, user: userData })
				
  } catch (err) {
    return res.status(401).send("Authentication faild!")
  }
}

export {
	refreshToken
}