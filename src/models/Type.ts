import pool from '../config/db.config'

export type BaseType = {
  id?: number,
  name: string,
  slug: string,
}

export default class TypeModel {
  async index(): Promise<any[]> {
    const connection = await pool.connect();
    try {
      const sql = `
        SELECT 
          types.id, types.name,
          attributes_query as attributes
        FROM types
        LEFT JOIN (
          SELECT 
            type_id,
            json_agg(json_build_object('id', attributes.id, 'name', attributes.name, 'values', attribute_values_query)) attributes_query
          FROM type_attributes ta
          LEFT JOIN attributes ON ta.attribute_id = attributes.id
          LEFT JOIN (
            SELECT
              attribute_id,
              json_agg(json_build_object('id', attribute_values.id, 'name', attribute_values.name)) attribute_values_query
            FROM attribute_values
            GROUP BY attribute_id
          ) v ON attributes.id = v.attribute_id
          GROUP BY type_id
        ) a ON a.type_id = types.id
        `;
        
      const result = await connection.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get types  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }



  async show(id: number): Promise<BaseType> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM types WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get type. Error:  ${(err as Error).message}`)
    }
  }
  

  async getOne(id: number): Promise<any> {
    const connection = await pool.connect();
    try {
      const sql = `
        SELECT 
          types.id AS id, 
          types.name AS type_name, 
          type_values.id AS type_value_id,
          type_values.name AS type_value_name,
          type_values.slug AS type_value_slug
        FROM types
        LEFT OUTER JOIN type_values ON types.id = type_values.type_id
        WHERE types.id = $1;
        `;

      const result = await connection.query(sql, [id]);
      // if (result.rowCount === 0){
      //   throw new Error(`Type ${id} not found`);
      // } 
      
      // return result.rows
      return {
        id: result.rows[0].id,
        name: result.rows[0]?.type_name,
        values: result.rows.map((row) => {
          if(row.type_value_id) {
            return {
              id: row.type_value_id,
              name: row.type_value_name,
              slug: row.type_value_slug,
            }
          }
          
        }).filter(Boolean),
      };

    } catch (err) {
      throw new Error(`Could not get type value. Error:  ${(err as Error).message}`)
    }finally{
      connection.release();
    }
  }

  async create(type: BaseType): Promise<BaseType> {
    try {

      const connection= await pool.connect()
      const sql = 'INSERT INTO types (name, slug) VALUES($1, $2) RETURNING *'
      const result = await connection.query(sql, [type.name, type.slug])
      const newEmployee = result.rows[0]

      connection.release()

      return newEmployee
    } catch (err) {
      console.log(err)
      throw new Error(`unable create type (${type.name}): ${(err as Error).message} `)
    }
  }


  async update(typeId: number, type: BaseType): Promise<BaseType> {
    try {
      const connection = await pool.connect();
      const sql = "UPDATE types SET name=$1, slug=$2 WHERE id = $5 RETURNING *";
      const result = await connection.query(sql, [type.name, type.slug, typeId]);
      connection.release();
      const updatedEmployee = result.rows[0];
      return updatedEmployee;
    } catch (err) {
      throw new Error(`Could not update type. Error:  ${(err as Error).message}`)
    }
  }

  async delete(typeId: number): Promise<BaseType> {
    try {
      const connection = await pool.connect();
      const sql = "DELETE FROM types WHERE id=$1 RETURNING *";
      const result = await connection.query(sql, [typeId]);
      connection.release();
      const deletedEmployee = result.rows[0];
      return deletedEmployee;
    } catch (err) {
      throw new Error(`Could not delete type ${typeId}. Error:  ${(err as Error).message}`)
    }
  }
}