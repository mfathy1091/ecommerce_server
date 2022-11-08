import pool from '../config/db.config'

export type BaseCategory = {
  id?: number,
  parent_category_id: number
  name: string,
  slug: string,
  image?: string
  is_active: boolean
}

export default class CategoryModel {
  async index(): Promise<BaseCategory[]> {
    const connection = await pool.connect();
    try {
      const sql = `SELECT * FROM categories`;
      const result = await connection.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get categories  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }

  async show(id: number): Promise<BaseCategory> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM categories WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get category. Error:  ${(err as Error).message}`)
    }
  }

  async create(category: BaseCategory): Promise<BaseCategory> {
    try {

      const connection= await pool.connect()
      const sql = 'INSERT INTO categories (parent_category_id, name, slug, image, is_active) VALUES($1, $2, $3) RETURNING *'
      const result = await connection.query(sql, [category.parent_category_id, category.name, category.slug, category.image, category.is_active])
      const newEmployee = result.rows[0]

      connection.release()

      return newEmployee
    } catch (err) {
      console.log(err)
      throw new Error(`unable create category (${category.name}): ${(err as Error).message} `)
    }
  }


  async update(categoryId: number, category: BaseCategory): Promise<BaseCategory> {
    try {
      const connection = await pool.connect();
      const sql = "UPDATE categories SET parent_category_id=$1, name=$2, slug=$3, image=$4, is_active=&5 WHERE id = $6 RETURNING *";
      const result = await connection.query(sql, [category.parent_category_id, category.name, category.slug, category.image, category.is_active, categoryId]);
      connection.release();
      const updatedEmployee = result.rows[0];
      return updatedEmployee;
    } catch (err) {
      throw new Error(`Could not update category. Error:  ${(err as Error).message}`)
    }
  }

  async delete(categoryId: number): Promise<BaseCategory> {
    try {
      const connection = await pool.connect();
      const sql = "DELETE FROM categories WHERE id=$1 RETURNING *";
      const result = await connection.query(sql, [categoryId]);
      connection.release();
      const deletedEmployee = result.rows[0];
      return deletedEmployee;
    } catch (err) {
      throw new Error(`Could not delete category ${categoryId}. Error:  ${(err as Error).message}`)
    }
  }
}