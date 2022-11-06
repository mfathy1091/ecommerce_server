import pool from '../config/db.config'

export type BaseBeneficiary = {
    id?: number,
    full_name: string,
    file_number: string,
    individual_number?: string,
    passport_number?: string,
    created_at?: string,
    updated_at?: string,
}

export default class BeneficiaryModel {
    async index(query: any ): Promise<{}> {
        const connection = await pool.connect();
        try {
            const sql = `
            SELECT * 
            FROM beneficiaries 
            WHERE full_name ILIKE $1 
            OR file_number ILIKE $1
            OR individual_number ILIKE $1
            OR passport_number ILIKE $1
            ORDER BY id DESC
            LIMIT $3
            OFFSET (($2 - 1) * $3);
            `;
            const result = await connection.query(sql, [`%${query.stringToSearch}%`, query.page, query.limit]);

            const totalRowsSql = `
            SELECT COUNT(*) 
            FROM beneficiaries 
            WHERE full_name ILIKE $1 
            OR file_number ILIKE $1
            OR individual_number ILIKE $1
            OR passport_number ILIKE $1
            `;
            const totalRowsResult = await connection.query(totalRowsSql,  [`%${query.stringToSearch}%`]);

            const data = {
                beneficiaries: result.rows,
                totalRows: totalRowsResult.rows[0].count
            }
            return data;
        } catch (err) {
            throw new Error(`Cannot get beneficiaries  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }


    async show(id: number): Promise<BaseBeneficiary> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM beneficiaries WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get beneficiary. Error:  ${(err as Error).message}`)
        }
    }

    async create(beneficiary: BaseBeneficiary): Promise<BaseBeneficiary> {
        try {
            console.log(beneficiary)
            const conn = await pool.connect()
            const sql = 'INSERT INTO beneficiaries (full_name, file_number, individual_number, passport_number) VALUES($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [beneficiary.full_name, beneficiary.file_number, beneficiary.individual_number, beneficiary.passport_number])
            const newBeneficiary = result.rows[0]
            conn.release()
            console.log(newBeneficiary)
            return newBeneficiary
        } catch (err) {
            console.log(err)
            throw new Error(`unable create beneficiary (${beneficiary.full_name}): ${(err as Error).message} `)
        }
    }


    async update(beneficiaryId: number, beneficiary: BaseBeneficiary): Promise<BaseBeneficiary> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE beneficiaries SET full_name = $1, file_number = $2, individual_number=$3, passport_number=$4 WHERE id = $5 RETURNING *";
            const result = await connection.query(sql, [beneficiary.full_name, beneficiary.file_number, beneficiary.individual_number, beneficiary.passport_number, beneficiaryId]);
            connection.release();
            const updatedBeneficiary = result.rows[0];
            return updatedBeneficiary;
        } catch (err) {
            throw new Error(`Could not update beneficiary. Error:  ${(err as Error).message}`)
        }
    }

    async delete(beneficiaryId: number): Promise<BaseBeneficiary> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM beneficiaries WHERE id=$1 LIMIT 10 RETURNING *";
            const result = await connection.query(sql, [beneficiaryId]);
            connection.release();
            const deletedBeneficiary = result.rows[0];
            return deletedBeneficiary;
        } catch (err) {
            throw new Error(`Could not delete beneficiary ${beneficiaryId}. Error:  ${(err as Error).message}`)
        }
    }



}

