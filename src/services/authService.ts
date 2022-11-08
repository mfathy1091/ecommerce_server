
import jwt from 'jsonwebtoken'
import UserModel, { BaseUser } from '../models/User'
import EmployeeModel from '../models/Category';
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
  const connection= await pool.connect()
  try {
    const sql = `
      SELECT *
      FROM users
      WHERE username=($1)
      `
    const result = await connection.query(sql, [username])
    if (result.rows.length) {
      return result.rows[0];
    }else{
      return null;
    }
  } catch (err) {
    throw new Error(`${(err as Error).message}`);
  } finally {
    connection.release();
  }
}

const getUserByRefreshToken = async (refreshToken: string): Promise<any> => {
  const connection= await pool.connect()
  try {
    const sql = `
      SELECT *
      FROM users
      WHERE refresh_token=($1)
      `
    const result = await connection.query(sql, [refreshToken])
    if (result.rows.length) {
      return result.rows[0];
    }else{
      return null;
    }
  } catch (err) {
    throw new Error(`${(err as Error).message}`);
  } finally { 
    connection.release();
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
