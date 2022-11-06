import pool from '../config/db.config'

export type BaseServiceAssignment = {
    id?: number,
    service_id: number,
    beneficiary_id: number,
    ps_intake_id: number,
    service_date: string
}

export default class ServiceAssignmentModel {
    async index(): Promise<BaseServiceAssignment[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM service_assignments`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get service_assignments  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: number): Promise<BaseServiceAssignment> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM service_assignments WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get beneficiary. Error:  ${(err as Error).message}`)
        }
    }

    async create(serviceAssignment: BaseServiceAssignment): Promise<BaseServiceAssignment> {
        try {

            const conn = await pool.connect()
            const sql = 'INSERT INTO service_assignments (service_id, beneficiary_id, ps_intake_id, service_date) VALUES($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [serviceAssignment.service_id, serviceAssignment.beneficiary_id, serviceAssignment.ps_intake_id, serviceAssignment.service_date])
            const newServiceAssignment = result.rows[0]

            conn.release()

            return newServiceAssignment
        } catch (err) {
            console.log(err)
            throw new Error(`unable create beneficiary (${serviceAssignment.service_id}): ${(err as Error).message} `)
        }
    }


    async update(serviceAssignmentId: number, serviceAssignment: BaseServiceAssignment): Promise<BaseServiceAssignment> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE service_assignments SET service_id = $1, beneficiary_id = $2, ps_intake_id = $3, service_date = $4 WHERE id = $5 RETURNING *";
            const result = await connection.query(sql, [serviceAssignment.service_id, serviceAssignment.beneficiary_id, serviceAssignment.ps_intake_id, serviceAssignment.service_date, serviceAssignmentId]);
            connection.release();
            const updatedBeneficiary = result.rows[0];
            return updatedBeneficiary;
        } catch (err) {
            throw new Error(`Could not update serviceAssignment. Error:  ${(err as Error).message}`)
        }
    }

    async delete(serviceAssignmentId: number): Promise<BaseServiceAssignment> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM service_assignments WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [serviceAssignmentId]);
            connection.release();
            const deletedServiceAssignment = result.rows[0];
            return deletedServiceAssignment;
        } catch (err) {
            throw new Error(`Could not delete serviceAssignment ${serviceAssignmentId}. Error:  ${(err as Error).message}`)
        }
    }


}

