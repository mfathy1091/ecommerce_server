import { NextFunction, Request, Response } from 'express'
import UserModel, { BaseUser } from '../models/User'
import { comparePlainToHashed, hashPassword } from '../utils/hashing'
const userModel = new UserModel()

const index = async (_req: Request, res: Response, next: NextFunction) => {
  const query = {
    page: parseInt(_req.query.page as string),
    limit: parseInt(_req.query.limit as string) || 5,
    keyword: _req.query.keyword as string || "",
  }
  try {
    const users = await userModel.index(query)
    res.json(users)
  } catch (err) {
    next(err)
  }
}

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.show(Number(req.params.userId))
    res.json(user)
  } catch (err) {
    next(err)
  }
}



const update = async (req: Request, res: Response, next: NextFunction) => {
  const user: Omit<BaseUser, "id"> = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    full_name: req.body.fullName,
    role_id: req.body.roleId,
    avatar_url: req.body.avatarUrl,
    is_active: req.body.isActive
  }
  try {
    const updatedUser = await userModel.update(req.params.userId, user)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {  
  // (1) Validate request parameters, queries using express-validator
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;
  if (!currentPassword || !newPassword || !newPasswordConfirm) {
    return res.status(400).json('some parameters are missing.');
  }
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).json('New password and it confirmation are different!');
  }
  if (newPassword === currentPassword) {
    return res.status(400).json('New password is the same as the current one! please choose another password');
  }

  try {
    // (2) Get user
    const foundUser  = await userModel.show(Number(req.params.userId));
    if (!foundUser){
      return res.status(500).json("User not found!");
    } 

    // (3) Verify password
    const paswordMatch = await comparePlainToHashed(currentPassword, foundUser.password);
    if (!paswordMatch){
      return res.status(500).json("Current password is wrong!");
    }
    
    // (4) Hash the new password
    const hashedNewPassword = (await hashPassword(newPassword)) as unknown as string

    // (5) update the password
    const updatedUser = await userModel.updatePassword(req.params.userId, hashedNewPassword)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
}

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await userModel.delete(req.params.userId)
    res.json(deletedUser)
  } catch (err) {
    next(err)
  }

}

export {
  index,
  show,
  update,
  destroy,
  resetPassword
}