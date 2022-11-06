//@ts-ignore
import pool from '../config/db.config'

export class PsIntakeBeneficiaryQueries {
    // BeneficiaryProblems -> ps / housing / health

    // (1) getAllBeneficiariesInPsIntake
    // (2) addBeneficiariesToPsIntake
    // (3) removeBeneficiariesFromPsIntake
    // (4) updateIsDirect


    // Get all products that have been included in orders
    async getBeneficiariesInPsIntake(): Promise<{ name: string, price: number, order_id: string }[]> {
        try {
            //@ts-ignore
            const conn = await pool.connect()
            const sql = `
                SELECT 
                    b.id, b.name, b.file_id
                FROM beneficiaries AS b 
                INNER JOIN beneficiary_ps_intakes AS  bpi
                    ON b.id = bpi.beneficiary_id
                INNER JOIN ps_intakes AS pi
                    ON bpi.ps_intake_id = pi.id
            `


            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
        }
    }

    
    async BeneficiaryPsServices(beneficiaryId: number, PsIntakeId: number): Promise<{ name: string, price: number, order_id: string }[]> {
        try {
            
            // get services for a specific day
            // get services for a specific beneficiary (for all psIntakes)
            // get services for a specific psIntake (for all included beneficiaries)

            const conn = await pool.connect()
            
            // get services for a specific beneficiary for a specific psIntake    --- MOST USED ---
            const sql = `
                SELECT 
                    s.id, s.name
                FROM services AS s
                INNER JOIN beneficiaries AS b
                    ON b.id = s.beneficiary_id
                INNER JOIN ps_intakes AS pi
                    ON s.ps_intake_id = pi.id
            `


            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
        }
    }

    async BeneficiaryPsProblems(beneficiaryId: number, PsIntakeId: number): Promise<{ name: string, price: number, order_id: string }[]> {
        try {
            
            // get problems for a specific beneficiary (for all psIntakes)
            // get problems for a specific psIntake (for all included beneficiaries)

            const conn = await pool.connect()
            
            // get problems for a specific beneficiary for a specific psIntake    --- MOST USED ---
            const sql = `
                SELECT 
                    p.id, p.name
                FROM problems AS p
                INNER JOIN beneficiaries AS b
                    ON b.id = p.beneficiary_id
                INNER JOIN ps_intakes AS pi
                    ON p.ps_intake_id = pi.id
            `


            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
        }
    }

    async psIntakesStats(beneficiaryId: number, PsIntakeId: number): Promise<{ name: string, price: number, order_id: string }[]> {
        try {
            
            // get problems for a specific beneficiary (for all psIntakes)
            // get problems for a specific psIntake (for all included beneficiaries)

            const conn = await pool.connect()
            
            // get problems for a specific beneficiary for a specific psIntake    --- MOST USED ---
            const sql = `
                SELECT 
                    pi.id, p.name
                FROM ps_intakes AS pi
                INNER JOIN beneficiaries AS b
                    ON b.id = p.beneficiary_id
                INNER JOIN ps_intakes AS pi
                    ON p.ps_intake_id = pi.id
            `


            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
        }
    }

}