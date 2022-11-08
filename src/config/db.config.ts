import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    NODE_ENV,
} = process.env

console.log('NODE_ENV: ' + NODE_ENV)

let envVariables = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    
}

if (NODE_ENV === 'test') {
    envVariables = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        
    }
}

if (NODE_ENV === 'dev') {
    envVariables = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    }
}

if(!NODE_ENV || !['dev', 'test']){
    throw new Error('NODE_ENV is not set')
}


const pool = new Pool({
    ...envVariables,
    max: 10, // 10 connections, if not released, the db will hang
    connectionTimeoutMillis: 0,  // 0 is indifinite
    idleTimeoutMillis: 0    // when to delete an idle connection, (0 is not to delete)
});

pool.on('error', (error: Error) => {
    console.error("DB Connection Error")
    console.error(error.message)
})

export default pool