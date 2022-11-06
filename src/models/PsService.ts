import pool from '../config/db.config'

export type BasePsService = {
    id?: number,
    service_name: string,
    service_date: string,
    beneficiary_id: number
    ps_case_id: number
}

export default class PsServiceModel {
    async index(): Promise<BasePsService[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM ps_services`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get ps_services  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: number): Promise<BasePsService> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM ps_services WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get psService. Error:  ${(err as Error).message}`)
        }
    }

    async create(psService: BasePsService): Promise<BasePsService> {
        try {
            
            const conn = await pool.connect()
            const sql = 'INSERT INTO ps_services (service_name, service_date, beneficiary_id, ps_case_id) VALUES($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [psService.service_name, psService.service_date, psService.beneficiary_id, psService.ps_case_id])
            const newPsService = result.rows[0]

            conn.release()

            return newPsService
        } catch (err) {
            console.log(err)
            throw new Error(`unable create psService (${psService.service_name}): ${(err as Error).message} `)
        }
    }


    async update(psServiceId: number, psService: BasePsService): Promise<BasePsService> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE ps_services SET service_name = $1, service_date = $2, beneficiary_id = $3, ps_case_id = $4 WHERE id = $5 RETURNING *";
            const result = await connection.query(sql, [psService.service_name, psService.service_date, psService.beneficiary_id,psService.ps_case_id, psServiceId]);
            connection.release();
            const updatedPsService = result.rows[0];
            return updatedPsService;
        } catch (err) {
            throw new Error(`Could not update psService. Error:  ${(err as Error).message}`)
        }
    }

    async delete(psServiceId: number): Promise<BasePsService> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM ps_services WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [psServiceId]);
            connection.release();
            const deletedPsService = result.rows[0];
            return deletedPsService;
        } catch (err) {
            throw new Error(`Could not delete psService ${psServiceId}. Error:  ${(err as Error).message}`)
        }
    }
}