import pool from "../config/db.config";
import PsCaseModel, { BasePsCase } from '../models/PsCase'

const psCaseModel = new PsCaseModel();

type PsCase = Omit<BasePsCase, "created_by" | "assigned_by" | "assigned_to"> & {
    created_by_employee?: { id: number; name: string };
    assigned_employee?: { id: number; name: string };
    assigned_by_employee?: { id: number; name: string };
    beneficiaries?: { id: number; full_name: string; is_direct: number }[];
};


async function getOne(psCaseId: number): Promise<PsCase> {
    const connection = await pool.connect();
    try {
        const result = await connection.query(
            `
            SELECT ps_cases.id, ps_cases.referral_source,
            created_by_employee.id as "createdById",
            created_by_employee.name as "createdByName",
            assigned_employee.id as "assignedEmployeeId",
            assigned_employee.name as "assignedEmployeeName",
            assigned_by_employee.id as "assignedByEmployeeId",
            assigned_by_employee.name as "assignedByEmployeeName",
            beneficiary_ps_cases.is_direct,
            beneficiaries.full_name as "beneficiaryFullName",
            beneficiaries.id as "beneficiaryId"
            FROM ps_cases
            LEFT OUTER JOIN employees as created_by_employee ON ps_cases.created_by = created_by_employee.id
            LEFT OUTER JOIN employees as assigned_employee ON ps_cases.assigned_by = assigned_employee.id
            LEFT OUTER JOIN employees as assigned_by_employee ON ps_cases.assigned_to = assigned_by_employee.id
            LEFT OUTER JOIN beneficiary_ps_cases ON ps_cases.id = beneficiary_ps_cases.ps_case_id
            LEFT OUTER JOIN beneficiaries ON beneficiaries.id = beneficiary_ps_cases.beneficiary_id
            WHERE ps_cases.id = $1;
        `,
            [psCaseId]
        );

        if (result.rowCount === 0) throw new Error(`PS Case ${psCaseId} not found`);
        
        // return result.rows;
        return {
            id: result.rows[0].id,
            referral_source: result.rows[0].referral_source,
            created_by_employee: {
                id: result.rows[0].createdById,
                name: result.rows[0].createdByName,
            },
            assigned_employee: {
                id: result.rows[0].assignedEmployeeId,
                name: result.rows[0].assignedEmployeeName,
            },
            assigned_by_employee: {
                id: result.rows[0].assignedByEmployeeId,
                name: result.rows[0].assignedByEmployeeName,
            },
            beneficiaries: result.rows.map((row) => ({
                id: row.beneficiaryId,
                full_name: row.beneficiaryFullName,
                is_direct: row.is_direct,
            })),
        };
    } finally {
        connection.release();
    }
}

// : Promise<Order>
async function addBeneficiary(isDirect: number, psCaseId: number, beneficiaryId: number) {
    try {
        const sql = 'INSERT INTO beneficiary_ps_cases (is_direct, ps_case_id, beneficiary_id) VALUES($1, $2, $3) RETURNING *'
        //@ts-ignore
        const conn = await pool.connect()

        const result = await conn
            .query(sql, [isDirect, psCaseId, beneficiaryId])

        const order = result.rows[0]

        conn.release()

        return order
    } catch (err) {
        throw new Error(`Could not add beneficiary ${beneficiaryId} to ps case ${psCaseId}: ${err}`)
    }
}

async function removeBeneficiary(psCaseId: number, beneficiaryId: number) {
    try {
        const sql = "DELETE FROM beneficiary_ps_cases WHERE beneficiary_id=$1 AND ps_case_id=$2 RETURNING *";
        //@ts-ignore
        const conn = await pool.connect()

        const result = await conn
            .query(sql, [beneficiaryId, psCaseId])

        const order = result.rows[0]

        conn.release()

        return order
    } catch (err) {
        throw new Error(`Could not add beneficiary ${beneficiaryId} to ps case ${psCaseId}: ${err}`)
    }
}

async function updateIsDirect( psCaseId: number, beneficiaryId: number, isDirect: number): Promise<void> {
    const connection = await pool.connect();
    try {
        const result = await connection.query(
            "UPDATE beneficiary_ps_cases SET is_direct = $1 WHERE ps_case_id = $2 AND beneficiary_id = $3 RETURNING *;",
            [isDirect, psCaseId, beneficiaryId]
        );
        return result.rows[0].is_direct
    } catch (err) {
        throw new Error(`Failed to update is_direct for beneficiary ${beneficiaryId} in ps case ${psCaseId}: ${err}`);
    } finally {
        connection.release();
    }
}



export const psCaseService = {
    getOne,
    addBeneficiary,
    removeBeneficiary,
    updateIsDirect,
    // add: courseModel.add,
    // remove: courseModel.remove,
    // update: courseModel.update,
};