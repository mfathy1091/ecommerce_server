
import jwt from 'jsonwebtoken'
import UserModel, { BaseUser } from '../models/User'
import EmployeeModel from '../models/Employee';
import * as userService from './userService'

import pool from '../config/db.config';
import tokenService from '../helpers/createToken';
import { hashPassword } from '../utils/hashing';


const userModel = new UserModel();
const employeeModel = new EmployeeModel();

type CreateAccountParams = {
  username: string;
  plainTextPassword: string;
  role: "admin" | "psWorker";
  email: string,
  name: string;
};



const getUserByUsername = async (username: string): Promise<any> => {
  try {

    const conn = await pool.connect()
    const sql = `
      SELECT *
      FROM users
      WHERE username=($1)
      `
    const result = await conn.query(sql, [username])
    if (result.rows.length) {
      return result.rows[0];
    }else{
      return null;
    }
  } catch (err) {
    throw new Error(`${(err as Error).message}`);
  }
}

const getUserByRefreshToken = async (refreshToken: string): Promise<any> => {
  try {

    const conn = await pool.connect()
    const sql = `
      SELECT *
      FROM users
      WHERE refresh_token=($1)
      `
    const result = await conn.query(sql, [refreshToken])

    if (result.rows.length) {
      return result.rows[0];
    }else{
      return null;
    }
  } catch (err) {
    throw new Error(`${(err as Error).message}`);
  }
}


const generateToken = (user: BaseUser): string => {
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET as unknown as string);
  return token;
}       


export {
  getUserByUsername,
  getUserByRefreshToken,
  generateToken,
}
