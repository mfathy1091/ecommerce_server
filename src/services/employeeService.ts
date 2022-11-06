import pool from "../config/db.config";

export default class EmployeeService {
    async getAll({}, page: number, limit: number) {
        const connection = await pool.connect();
        try {
            const sql = `
                SELECT e.name, e.email, u.username
                FROM employees AS e
                LEFT OUTER JOIN users AS u
                    ON u.id = e.user_id
                LIMIT $1`;
            const result = await connection.query(sql, [limit]);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get employees ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }
}