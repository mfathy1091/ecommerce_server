import { NextFunction, Request, Response } from 'express'
import * as authService from '../services/authService'
import { hashPassword } from '../utils/hashing'
import createToken from '../helpers/createToken'
import * as jwt from 'jsonwebtoken'
import UserModel, { BaseUser } from '../models/User'
import { comparePlainToHashed } from '../utils/hashing'
const userModel = new UserModel()


// declare module "jsonwebtoken" {
//   export interface JwtPayload {
//     username: string;
//   }
// }

interface AuthRequest extends Request {
  userId: number,
  roleId: number
}


const register = async (req: Request, res: Response, next: NextFunction) => {
  // (1) Validate request parameters, queries using express-validator
  // & check for duplicate usernames / emails in the db

  const user: BaseUser = {
    full_name: req.body.fullName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role_id: Number(req.body.roleId),
    is_active: Boolean(req.body.isActive)
  }

  try {
    // (2) Hash the password
    const hashedPassword = (await hashPassword(user.password)) as unknown as string
    user.password = hashedPassword

    // (3) create new user
    const newUser = await userModel.create(user)
    
    // (4) Send confirmation email --- to be added ---

    // (5) Return response
    return res.status(201).json({
      'message': 'Successfuly created!',
      'user': newUser,
    })

  } catch (err) {
    next(err)
  }
}

const login = async (req: Request, res: Response) => {
  // (1) Validate request parameters, queries using express-validator
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ 'message': 'Username and password are required.' });
  }

  try {
    // (2) Check if user exists
    const user  = await authService.getUserByUsername(username);
    if (!user){
      return res.status(401).json("Authentication failed: User not found!");
    } 

    // (3) Check if active
    if(user.is_active === false){
      return res.status(401).json("Authentication failed: Inactive account!")
    }

    // (4) Verify password
    const paswordMatch = await comparePlainToHashed(password, user.password);
    if (!paswordMatch){
      return res.status(401).json("Authentication failed: Wrong password!");
    } 

    // (5) create JWTs
    const payload = { 
      userId: Number(user.id),
      roleId: Number(user.role_id) 
    }
    const accessToken = createToken.accessToken(payload);
    const refreshToken = createToken.refreshToken(payload);
    
    // (6) save refreshToken in DB with the current user
    const currentUser = { ...user, refresh_token: refreshToken };
    await userModel.update(user.id, currentUser);
    
    // (7) store referesh token in a http-only cookie
    // that way the cookie that contains the refresh token will be in every request
    /* IMPORTANT: ADD secure: true */
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 *60 *60 * 1000 });
    
    // (8) omit user's sensitive data before sending it
    const userData = {
      id: user.id,
      username: user.username,
      fullName: user.full_name,
      email: user.email,
      avatar: user.avatar,
      roleId: user.role_id,
      isActive: user.is_active
    }

    // (8) send the access token and  user
    return res.status(200).json({ accessToken: accessToken, user: userData })

  } catch (err) {
    console.log(err)
  }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  // On client, also delete the accessToken from the memory
  try {
		// (1) get the refreshToken from the httpOnly cookie
		const cookies = req.cookies;
    console.log('before deletion')
    console.log(cookies?.jwt)

		// if it is not there, it is okay, as we are going to delete it anyway
    if (!cookies?.jwt) return res.sendStatus(204); // successful but No content
    const refreshToken = cookies.jwt;

    // (2) Check if refreshToken exists in DB
    const user  = await authService.getUserByRefreshToken(refreshToken);
		// (3) if no user and yes cookie, then, delete the cookie
		if (!user){
      // no need to specify the maxAge option
			res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
			return res.sendStatus(204)
		} 
		
    // (4) Delete the refreshToken from the DB
		const currentUser = { ...user, refresh_token: '' };
		await userModel.update(currentUser.id, currentUser);

    // (5) Delete the cookie
    /* secure: true - add this option in porduction to only serve on https */
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    console.log('after deletion')
    console.log(cookies?.jwt)
		return res.sendStatus(204)

  } catch (err) {
    return res.status(500).send("Logout faild!"); 
  }
}

const getAuthUser = async (req: Request, res: Response, next: NextFunction) => {
  // (1) get userID from req (it was attached when verifyToken was called)
  const userId = (req as AuthRequest).userId;
  if (!userId){
    return res.status(401).json("Authentication failed: Access token has no userId!");
  }

  try {
    // (2) Check if user exists
    const user = await authService.getUserDetails(userId) // user id is comming from the verifyToken middleware
    if (!user){
      return res.status(401).json("Authentication failed: User not found!");
    }

    // (4) send the data
    return res.status(200).json({user: user});

  } catch (err) {
    next(err)  
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
		// (1) get the refreshToken from the httpOnly cookie
		const cookies = req.cookies;
    
    if (!cookies?.jwt){
      return res.status(401).json('refereshToken error: missing refresh token');
    } 
    const refreshToken = cookies.jwt;
    
    // (2) Check if user exists
    const user  = await authService.getUserByRefreshToken(refreshToken);
    
		if (!user) {
      return res.status(401).json('refereshToken error: user are not found'); 
    } 
    
		
    // (3) Verify the refreshToken
    jwt.verify(
      refreshToken as string,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, decoded) => {
        if (err || user.id !== (decoded as jwt.JwtPayload).userId) {
          return res.status(401).json('refereshToken error: invalid refresh token'); //invalid refresh token
        } 
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
        avatar: user.avatar,
        roleId: user.role_Id,
      }

      // (6) send back access token and user
      res.json({ accessToken: accessToken, user: userData })
				
  } catch (err) {
    return res.status(401).send(`Authentication faild!: ${err}`)
  }
}

export {
  register,
  login,
  logout,
  getAuthUser,
  refreshToken
}