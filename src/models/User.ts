import pool from '../config/db.config';
export type BaseUser = {
    id?: number,
    username: string,
    email: string,
    password: string,
    full_name?: string,
    role_id: number,
    refresh_token?: string,
    avatar?: string,
    is_active: number
}

export default class UserModel {

    async index(query: any): Promise<{}> {
        const connection = await pool.connect();
        try {
            const sql = `
                SELECT id, username, email, full_name 
                FROM users
                WHERE full_name ILIKE $1
                ORDER BY id DESC
                LIMIT $3
                OFFSET (($2 - 1) * $3);
                `;
            
            const result = await connection.query(sql, [`%${query.searchKeyword}%`, query.page, query.limit]);
            
            const totalRowsSql = `
            SELECT COUNT(*) 
            FROM users 
            WHERE full_name ILIKE $1 
            `;
            const totalRowsResult = await connection.query(totalRowsSql,  [`%${query.searchKeyword}%`]);
            
            const data = {
                users: result.rows,
                totalRows: totalRowsResult.rows[0].count
            }

            return data;
        } catch (err) {
            throw new Error(`Cannot get users  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: number): Promise<BaseUser> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get users. Error:  ${(err as Error).message}`)
        }
    }

    async create(user: BaseUser): Promise<BaseUser> {
        try {
            
            const connection= await pool.connect()
            const sql = 'INSERT INTO users (full_name, username, email, password, role_id, is_active) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, full_name, username, email, role_id, is_active'
            const result = await connection.query(sql, [user.full_name, user.username, user.email, user.password, user.role_id, user.is_active])
            const newUser = result.rows[0]

            connection.release()

            return newUser
        } catch (err) {
            console.log(err)
            throw new Error(`unable create user (${user.username}): ${(err as Error).message} `)
        }
    }


    async update(userId: string, user: BaseUser): Promise<BaseUser> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE users SET username = $1, password = $2, role_id=$3, refresh_token=$4 WHERE id=$5 RETURNING *";
            const result = await connection.query(sql, [user.username, user.password, user.role_id, user.refresh_token, userId]);
            connection.release();
            const updatedUser = result.rows[0];
            return updatedUser;
        } catch (err) {
            throw new Error(`Could not update user. Error:  ${(err as Error).message}`)
        }
    }

    async delete(userId: string): Promise<BaseUser> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [userId]);
            connection.release();
            const deletedUser = result.rows[0];
            return deletedUser;
        } catch (err) {
            throw new Error(`Could not delete user ${userId}. Error:  ${(err as Error).message}`)
        }
    }

    async updatePassword (userId: string, hashedPassword: string): Promise<BaseUser> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE users SET password = $2 WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [userId, hashedPassword]);
            connection.release();
            const updatedUser = result.rows[0];
            return updatedUser;
        } catch (err) {
            throw new Error(`Could not update password. Error:  ${(err as Error).message}`)
        }
    }

}
