import { NextFunction, Request, Response } from 'express'
import EmployeeModel from '../models/Employee'
import EmployeeService from '../services/employeeService'

import { BaseEmployee } from '../models/Employee'

const employeeModel = new EmployeeModel()
const employeeService = new EmployeeService()

const index = async (req: Request, res: Response, next:NextFunction) => {
    // Validate params/queries

    let queries = {}
    let page = req.params.page ? req.params.page : 1;
    let limit = req.params.limit ? req.params.limit : 10;
    try {
        const employees = await employeeService.getAll(queries, Number(page), Number(limit))
        res.json(employees)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const employee = await employeeModel.show(Number(req.params.employeeId))
        res.json(employee)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const employee: Omit<BaseEmployee, 'id'> = {
        name: req.body.name,
        email: req.body.email,
        user_id: Number(req.body.user_id),
    }
    try {
        const newEmployee = await employeeModel.create(employee)
        res.status(201)
        res.json(newEmployee)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const employee: Omit<BaseEmployee, "id"> = {
        name: req.body.name,
        email: req.body.email,
        user_id: Number(req.body.user_id),
    }
    try {
        const newEmployee = await employeeModel.update(Number(req.params.employeeId), employee)
        res.json(newEmployee)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedEmployee = await employeeModel.delete(Number(req.params.employeeId))
        res.json(deletedEmployee)
    } catch (err) {
        next(err)
    }
}

export {
    index,
    show,
    create,
    update,
    destroy,
}