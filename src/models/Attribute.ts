import pool from '../config/db.config'

export type BaseAttribute = {
  id?: number,
  name: string,
  slug: string,
  image?: string,
  is_active: boolean
}

export default class AttributeModel {
  async index(): Promise<BaseAttribute[]> {
    const connection = await pool.connect();
    try {
      const sql = `SELECT * FROM attributes`;
      const result = await connection.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get attributes  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }



  async show(id: number): Promise<BaseAttribute> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM attributes WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get attribute. Error:  ${(err as Error).message}`)
    }
  }
  
  async getAll(): Promise<any> {
    const connection = await pool.connect();
    try {
      let sql = `SELECT * FROM attributes`;

      sql = `
        SELECT 
          attributes.id AS id, attributes.name AS name, attributes.slug AS slug,
          json_agg(json_build_object('id', attribute_values.id, 'name', attribute_values.name)) as values
        FROM attributes
        LEFT OUTER JOIN attribute_values ON attributes.id = attribute_values.attribute_id
        GROUP BY attributes.id
        `;

        // json_agg(json_build_object('id', attribute_values.id, 'name', attribute_values.name, 'slug', attribute_values.slug)) as values
        const result = await connection.query(sql);
      return result.rows

      return {
        id: result.rows[0].id,
        name: result.rows[0]?.attribute_name,
        values: result.rows.map((row) => {
          if(row.attribute_value_id) {
            return {
              id: row.attribute_value_id,
              name: row.attribute_value_name,
              slug: row.attribute_value_slug,
            }
          }
          
        }).filter(Boolean),
      };
    } catch (err) {
      throw new Error(`Cannot get attributes  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }

  async getOne(id: number): Promise<any> {
    const connection = await pool.connect();
    try {
      const sql = `
        SELECT 
          attributes.id AS id, 
          attributes.name AS attribute_name, 
          attribute_values.id AS attribute_value_id,
          attribute_values.name AS attribute_value_name,
          attribute_values.slug AS attribute_value_slug
        FROM attributes
        LEFT OUTER JOIN attribute_values ON attributes.id = attribute_values.attribute_id
        WHERE attributes.id = $1;
        `;

      const result = await connection.query(sql, [id]);
      // if (result.rowCount === 0){
      //   throw new Error(`Attribute ${id} not found`);
      // } 
      
      // return result.rows
      return {
        id: result.rows[0].id,
        name: result.rows[0]?.attribute_name,
        values: result.rows.map((row) => {
          if(row.attribute_value_id) {
            return {
              id: row.attribute_value_id,
              name: row.attribute_value_name,
              slug: row.attribute_value_slug,
            }
          }
          
        }).filter(Boolean),
      };

    } catch (err) {
      throw new Error(`Could not get attribute value. Error:  ${(err as Error).message}`)
    }finally{
      connection.release();
    }
  }

  async create(attribute: BaseAttribute): Promise<BaseAttribute> {
    try {

      const connection= await pool.connect()
      const sql = 'INSERT INTO attributes (name, slug, image, is_active) VALUES($1, $2, $3, $4) RETURNING *'
      const result = await connection.query(sql, [attribute.name, attribute.slug, attribute.image, attribute.is_active])
      const newEmployee = result.rows[0]

      connection.release()

      return newEmployee
    } catch (err) {
      console.log(err)
      throw new Error(`unable create attribute (${attribute.name}): ${(err as Error).message} `)
    }
  }


  async update(attributeId: number, attribute: BaseAttribute): Promise<BaseAttribute> {
    try {
      const connection = await pool.connect();
      const sql = "UPDATE attributes SET name=$1, slug=$2, image=$3, is_active=&4 WHERE id = $5 RETURNING *";
      const result = await connection.query(sql, [attribute.name, attribute.slug, attribute.image, attribute.is_active, attributeId]);
      connection.release();
      const updatedEmployee = result.rows[0];
      return updatedEmployee;
    } catch (err) {
      throw new Error(`Could not update attribute. Error:  ${(err as Error).message}`)
    }
  }

  async delete(attributeId: number): Promise<BaseAttribute> {
    try {
      const connection = await pool.connect();
      const sql = "DELETE FROM attributes WHERE id=$1 RETURNING *";
      const result = await connection.query(sql, [attributeId]);
      connection.release();
      const deletedEmployee = result.rows[0];
      return deletedEmployee;
    } catch (err) {
      throw new Error(`Could not delete attribute ${attributeId}. Error:  ${(err as Error).message}`)
    }
  }
}