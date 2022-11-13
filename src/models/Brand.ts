import pool from '../config/db.config'

export type BaseBrand = {
  id?: number,
  name: string,
  slug: string,
}

export default class BrandModel {
  async index(): Promise<BaseBrand[]> {
    const connection = await pool.connect();
    try {
      const sql = `SELECT * FROM brands`;
      const result = await connection.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get brands  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }



  async show(id: number): Promise<BaseBrand> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM brands WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get brand. Error:  ${(err as Error).message}`)
    }
  }
  

  async getOne(id: number): Promise<any> {
    const connection = await pool.connect();
    try {
      const sql = `
        SELECT 
          brands.id AS id, 
          brands.name AS brand_name, 
          brand_values.id AS brand_value_id,
          brand_values.name AS brand_value_name,
          brand_values.slug AS brand_value_slug
        FROM brands
        LEFT OUTER JOIN brand_values ON brands.id = brand_values.brand_id
        WHERE brands.id = $1;
        `;

      const result = await connection.query(sql, [id]);
      // if (result.rowCount === 0){
      //   throw new Error(`Brand ${id} not found`);
      // } 
      
      // return result.rows
      return {
        id: result.rows[0].id,
        name: result.rows[0]?.brand_name,
        values: result.rows.map((row) => {
          if(row.brand_value_id) {
            return {
              id: row.brand_value_id,
              name: row.brand_value_name,
              slug: row.brand_value_slug,
            }
          }
          
        }).filter(Boolean),
      };

    } catch (err) {
      throw new Error(`Could not get brand value. Error:  ${(err as Error).message}`)
    }finally{
      connection.release();
    }
  }

  async create(brand: BaseBrand): Promise<BaseBrand> {
    try {

      const connection= await pool.connect()
      const sql = 'INSERT INTO brands (name, slug) VALUES($1, $2) RETURNING *'
      const result = await connection.query(sql, [brand.name, brand.slug])
      const newEmployee = result.rows[0]

      connection.release()

      return newEmployee
    } catch (err) {
      console.log(err)
      throw new Error(`unable create brand (${brand.name}): ${(err as Error).message} `)
    }
  }


  async update(brandId: number, brand: BaseBrand): Promise<BaseBrand> {
    try {
      const connection = await pool.connect();
      const sql = "UPDATE brands SET name=$1, slug=$2 WHERE id = $5 RETURNING *";
      const result = await connection.query(sql, [brand.name, brand.slug, brandId]);
      connection.release();
      const updatedEmployee = result.rows[0];
      return updatedEmployee;
    } catch (err) {
      throw new Error(`Could not update brand. Error:  ${(err as Error).message}`)
    }
  }

  async delete(brandId: number): Promise<BaseBrand> {
    try {
      const connection = await pool.connect();
      const sql = "DELETE FROM brands WHERE id=$1 RETURNING *";
      const result = await connection.query(sql, [brandId]);
      connection.release();
      const deletedEmployee = result.rows[0];
      return deletedEmployee;
    } catch (err) {
      throw new Error(`Could not delete brand ${brandId}. Error:  ${(err as Error).message}`)
    }
  }
}