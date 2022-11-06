import { Request, Response, NextFunction } from 'express'
interface Error {
    name? : string,
    message?: string,
    stack?: string,
    status?: number,
}

const ErrorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Error'
    res.status(status).json({ status, message })
}

export default ErrorHandler