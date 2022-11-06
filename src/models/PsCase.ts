import pool from '../config/db.config'

export type BasePsCase = {
    id?: number,
    referral_source: string,
    created_by: number,
    assigned_to: number,
    assigned_by: number,
}

export default class PsCaseModel {
    
    async index(query: any): Promise<{}> {
        const connection = await pool.connect();
        try {
            const sql = `
                SELECT * 
                FROM ps_cases
                WHERE status = $3
                ORDER BY id DESC
                LIMIT $2
                OFFSET (($1 - 1) * $2);
                `;
            const result = await connection.query(sql, [query.page, query.limit, query.status]);
            
            const totalRowsSql = `
            SELECT COUNT(*) 
            FROM ps_cases
            WHERE status = $1
            `;
            const totalRowsResult = await connection.query(totalRowsSql, [query.status]);

            const data = {
                psCases: result.rows,
                totalRows: totalRowsResult.rows[0].count
            }
            return data;
        } catch (err) {
            throw new Error(`Cannot get psCases  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async create(psCase: BasePsCase): Promise<BasePsCase> {
        try {

            const conn = await pool.connect()
            const sql = 'INSERT INTO ps_cases (referral_source, created_by, assigned_to, assigned_by) VALUES($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [psCase.referral_source, psCase.created_by, psCase.assigned_to, psCase.assigned_by])
            const newPsCase = result.rows[0]

            conn.release()

            return newPsCase
        } catch (err) {
            console.log(err)
            throw new Error(`unable create psCase (${psCase.referral_source}): ${(err as Error).message} `)
        }
    }


    async update(psCaseId: number, psCase: BasePsCase): Promise<BasePsCase> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE ps_cases SET referral_source = $1, created_by = $2, assigned_to=$3, assigned_by=$4 WHERE id = $5 RETURNING *";
            const result = await connection.query(sql, [psCase.referral_source, psCase.created_by, psCase.assigned_to, psCase.assigned_by, psCaseId]);
            connection.release();
            const updatedPsCase = result.rows[0];
            return updatedPsCase;
        } catch (err) {
            throw new Error(`Could not update psCase. Error:  ${(err as Error).message}`)
        }
    }

    async delete(psCaseId: number): Promise<BasePsCase> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM ps_cases WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [psCaseId]);
            connection.release();
            const deletedPsCase = result.rows[0];
            return deletedPsCase;
        } catch (err) {
            throw new Error(`Could not delete psCase ${psCaseId}. Error:  ${(err as Error).message}`)
        }
    }


}