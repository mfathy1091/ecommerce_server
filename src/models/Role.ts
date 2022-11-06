import pool from '../config/db.config'

export type BaseRole = {
    id?: number,
    role_name: string,
}

export default class PsServiceModel {
    async index(): Promise<BaseRole[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM roles`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get roles  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: number): Promise<BaseRole> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM roles WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get role. Error:  ${(err as Error).message}`)
        }
    }

    async create(role: BaseRole): Promise<BaseRole> {
        try {
            
            const conn = await pool.connect()
            const sql = 'INSERT INTO roles (role_name) VALUES($1) RETURNING *'
            const result = await conn.query(sql, [role.role_name])
            const newPsService = result.rows[0]

            conn.release()

            return newPsService
        } catch (err) {
            console.log(err)
            throw new Error(`unable create role (${role.role_name}): ${(err as Error).message} `)
        }
    }


    async update(roleId: number, role: BaseRole): Promise<BaseRole> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE roles SET role = $1 WHERE id = $5 RETURNING *";
            const result = await connection.query(sql, [role.role_name, roleId]);
            connection.release();
            const updatedPsService = result.rows[0];
            return updatedPsService;
        } catch (err) {
            throw new Error(`Could not update role. Error:  ${(err as Error).message}`)
        }
    }

    async delete(roleId: number): Promise<BaseRole> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM roles WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [roleId]);
            connection.release();
            const deletedPsService = result.rows[0];
            return deletedPsService;
        } catch (err) {
            throw new Error(`Could not delete role ${roleId}. Error:  ${(err as Error).message}`)
        }
    }
}