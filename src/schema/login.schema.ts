import { check, body } from 'express-validator/check'
import * as userService from '../services/userService';

const schema = [
    check('username')
        .isAlphanumeric().withMessage('Username must contain alphabets and numbers only')
        .isLength({min: 4, max: 32}).withMessage('Username cannot be empty and must have min 4 and max 32 characters')
        .bail()
        .custom(async (username) => {
            const user = await userService.findByUsername(username);
            if(!user){
                throw new Error('Username is wrong')
            }
        })
    ,
    body(
        'password',
        'Please enter a password ith only numbers and at least 5 characters'
    ).isLength({ min:  5 })
    .isAlphanumeric()
]

export { schema as loginSchema }