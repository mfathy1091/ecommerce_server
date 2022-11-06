import pool from '../config/db.config'

export type BaseEmployee = {
    id?: number,
    name: string,
    email: string,
    user_id: number
}

export default class EmployeeModel {
    async index(): Promise<BaseEmployee[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM employees`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get employees  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: number): Promise<BaseEmployee> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM employees WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get employee. Error:  ${(err as Error).message}`)
        }
    }

    async create(employee: BaseEmployee): Promise<BaseEmployee> {
        try {
            
            const conn = await pool.connect()
            const sql = 'INSERT INTO employees (name, email, user_id) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [employee.name, employee.email, employee.user_id])
            const newEmployee = result.rows[0]

            conn.release()

            return newEmployee
        } catch (err) {
            console.log(err)
            throw new Error(`unable create employee (${employee.name}): ${(err as Error).message} `)
        }
    }


    async update(employeeId: number, employee: BaseEmployee): Promise<BaseEmployee> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE employees SET name = $1, email = $2, user_id = $3 WHERE id = $4 RETURNING *";
            const result = await connection.query(sql, [employee.name, employee.email, employee.user_id, employeeId]);
            connection.release();
            const updatedEmployee = result.rows[0];
            return updatedEmployee;
        } catch (err) {
            throw new Error(`Could not update employee. Error:  ${(err as Error).message}`)
        }
    }

    async delete(employeeId: number): Promise<BaseEmployee> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM employees WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [employeeId]);
            connection.release();
            const deletedEmployee = result.rows[0];
            return deletedEmployee;
        } catch (err) {
            throw new Error(`Could not delete employee ${employeeId}. Error:  ${(err as Error).message}`)
        }
    }
}