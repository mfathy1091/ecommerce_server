import { check, body } from 'express-validator/check'

const schema = [
    // check('email')
    //     .isEmail().withMessage('Please enter a valid email')
    //     .notEmpty().withMessage('Email cannot be empty')
    // ,
    check('fullName')
        .isString()
        .notEmpty().withMessage('full name is required')
        .isLength({min: 4, max: 32}).withMessage('full name cannot be empty and must have min 4 and max 32 characters')
    ,
]

export { schema as beneficiarySchema }