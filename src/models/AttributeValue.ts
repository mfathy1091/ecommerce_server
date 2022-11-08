import pool from '../config/db.config'

export type BaseAttributeValue = {
  id?: number,
  attribute_id: number,
  name: string,
  slug: string,
  image?: string
  is_active: boolean
}

export default class AttributeValueModel {
  async index(): Promise<BaseAttributeValue[]> {
    const connection = await pool.connect();
    try {
      const sql = `SELECT * FROM attribute_values`;
      const result = await connection.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get attributes values  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }

  async show(id: number): Promise<BaseAttributeValue> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM attribute_values WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get attribute value. Error:  ${(err as Error).message}`)
    }
  }

  async create(attributeValue: BaseAttributeValue): Promise<BaseAttributeValue> {
    try {

      const connection= await pool.connect()
      const sql = 'INSERT INTO attribute_values (attribute_id, name, slug, image, is_active) VALUES($1, $2, $3, $4, $5) RETURNING *'
      const result = await connection.query(sql, [attributeValue.attribute_id, attributeValue.name, attributeValue.slug, attributeValue.image, attributeValue.is_active])
      const newEmployee = result.rows[0]

      connection.release()

      return newEmployee
    } catch (err) {
      console.log(err)
      throw new Error(`unable create attribute value (${attributeValue.name}): ${(err as Error).message} `)
    }
  }


  async update(attributeValueId: number, attributeValue: BaseAttributeValue): Promise<BaseAttributeValue> {
    try {
      const connection = await pool.connect();
      const sql = "UPDATE attribute_values SET attribute_id=$1, name=$2, slug=$3, image=$4, is_active=&5 WHERE id=$6 RETURNING *";
      const result = await connection.query(sql, [attributeValue.attribute_id, attributeValue.name, attributeValue.slug, attributeValue.image, attributeValue.is_active, attributeValueId]);
      connection.release();
      const updatedEmployee = result.rows[0];
      return updatedEmployee;
    } catch (err) {
      throw new Error(`Could not update attribute value. Error:  ${(err as Error).message}`)
    }
  }

  async delete(attributeValueId: number): Promise<BaseAttributeValue> {
    try {
      const connection = await pool.connect();
      const sql = "DELETE FROM attribute_values WHERE id=$1 RETURNING *";
      const result = await connection.query(sql, [attributeValueId]);
      connection.release();
      const deletedEmployee = result.rows[0];
      return deletedEmployee;
    } catch (err) {
      throw new Error(`Could not delete attribute value ${attributeValueId}. Error:  ${(err as Error).message}`)
    }
  }
}