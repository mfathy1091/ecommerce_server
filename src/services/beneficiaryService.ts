import pool from '../config/db.config'
import { BaseBeneficiary } from '../models/Beneficiary';

export default class BeneficiaryService {
    async getBeneficiariesInPsIntake(psIntakeId: number): Promise<BaseBeneficiary[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM beneficiaries WHERE ps_intake_id=$1`;
            const result = await connection.query(sql, [psIntakeId]);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get beneficiaries in psIntake ${psIntakeId} ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }
}

