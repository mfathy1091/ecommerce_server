import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import router from './routes/index';
import ErrorHandler from './middlewares/ErrorHandler'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import credentials from './middlewares/credentials';
import corsOptions from './config/corsOptions';
const app: express.Application = express()
const address: string = "127.0.0.1:"+ process.env.NODE_PORT

// (2) Middlewares

// Handle options credentials check for allowed origins - before CORS!
// and fetch cookies credentials requirements
app.use(credentials)

// Add allowed origins
app.use(cors(corsOptions))

app.use(express.urlencoded());
app.use(express.json())
app.use(cookieParser())



app.use(morgan("common"))

app.use('/api', router);

interface Error {
    name? : string,
    message?: string,
    stack?: string,
    status?: number,
}





// (3) Routes
app.use('/uploads', express.static('uploads'))
app.use(ErrorHandler);

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'Not Found'
    })
})

app.listen(process.env.NODE_PORT, function () {
    console.log(`Server is started on: ${address}`)
})

export default app