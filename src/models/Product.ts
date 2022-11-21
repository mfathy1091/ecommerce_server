import pool from '../config/db.config';
import format from 'pg-format'

export type Product = {
  id?: number,
  name: string,
  brand_id: number
  category_id: number,
  description: string,
  images: [],
  is_discontinued: boolean,
}

export default class ProductModel {

  async index(): Promise<Promise<{}>> {
    const connection = await pool.connect();
    try {
      const sql = `SELECT * FROM products`;
      const result = await connection.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }

  async filter(query: any): Promise<Promise<{}>> {
    const connection = await pool.connect();
    try {
      const sql = `
        SELECT
          products.id, products.name, products.description, products.category_id,
          brands.id AS "brandId", brands.name as "brandName",
          categories.id AS "categoryId", categories.name as "categoryName", categories.slug as "categorySlug",
          images.url as "image"
          FROM products
        LEFT JOIN brands ON products.brand_id = brands.id
        LEFT JOIN categories ON products.category_id = categories.id
        LEFT JOIN images ON products.id = images.product_id
        WHERE categories.slug=$1`;
      const result = await connection.query(sql, [query.categorySlug]);

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }

  async getAll(query: any): Promise<{}> {
    const connection = await pool.connect();
    try {
      const sql = `
        SELECT *
        FROM products
        WHERE name ILIKE $1 
        ORDER BY id DESC
        LIMIT $3
        OFFSET (($2 - 1) * $3);
      `;
      const result = await connection.query(sql, [`%${query.searchKeyword}%`, query.page, query.limit]);

      const totalRowsSql = `
        SELECT COUNT(*) 
        FROM products 
        WHERE name ILIKE $1 
      `;
      const totalRowsResult = await connection.query(totalRowsSql, [`%${query.searchKeyword}%`]);

      const data = {
        products: result.rows,
        totalRows: totalRowsResult.rows[0].count
      }
      return data;
    } catch (err) {
      throw new Error(`Cannot get products  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }

  // async show(id: string): Promise<Product> {
  //   let connection = await pool.connect();
  //   try {
  //     const sql = 'SELECT * FROM products WHERE id=($1)';
  //     const result = await connection.query(sql, [id]);
  //     return result.rows[0];
  //   } catch (err) {
  //     throw new Error(`Could not get products. Error:  ${(err as Error).message}`)
  //   } finally {
  //     connection.release();
  //   }
  // }

  async show(id: string): Promise<Product> {
    let connection = await pool.connect();
    try {
      const sql = `
        SELECT 
          products.id, products.name, products.description,
          json_agg(json_build_object('id', brands.id, 'name', brands.name)) AS brands,
          json_agg(json_build_object('url', images.url)) AS images,
          json_agg(json_build_object('id', categories.id, 'name', categories.name)) AS categories
        FROM products 
        LEFT JOIN brands ON products.brand_id = brands.id
        LEFT JOIN categories ON products.category_id = categories.id
        LEFT JOIN images ON products.id = images.product_id
        WHERE products.id=($1)
        GROUP BY products.id
      `;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get product. Error:  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }

  async create(product: Product): Promise<Product> {
    let connection = await pool.connect();
    
    try {
      const sql = "INSERT INTO products (brand_id, category_id, name, description, is_discontinued) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const result = await connection.query(sql, [product.brand_id, product.category_id, product.name, product.description, product.is_discontinued]);
      const newProduct = result.rows[0];

      let arr = product.images.map((image) => {
        return [newProduct.id, image, 'large', 'false']
      })

      const sql2 = format("INSERT INTO images (product_id, url, size, is_featured) VALUES %L RETURNING *", arr);
      const result2 = await connection.query(sql2);
      
      const finalProduct = {
        ...newProduct,
        ...result2.rows[0]
      }

      return finalProduct;
    } catch (err) {
      throw new Error(`Could not create product. Error:  ${(err as Error).message}`)
    }finally {
      connection.release();
    }
  }

  async update(productId: string, product: Omit<Product, "id">): Promise<Product> {
    let connection = await pool.connect();
    try {
      const sql = "UPDATE products SET brand_id=$1, category_id=$2, name=$3, description=$4, is_discontinued=$5 WHERE id=$7 RETURNING *";
      const result = await connection.query(sql, [product.brand_id, product.category_id, product.name, product.description, product.is_discontinued, productId]);
      const updatedProduct = result.rows[0];

      const sql2 = "INSERT INTO images (product_id, url, size, is_featured) VALUES ($1, $2, $3, $4) RETURNING *";
      const result2 = await connection.query(sql2, [updatedProduct.id, product.images, 'large', 'false']);
      const image = result2.rows[0];

      const finalProduct = {
        ...updatedProduct,
        ...image
      }
      
      return finalProduct;
    } catch (err) {
      throw new Error(`Could not update product. Error:  ${(err as Error).message}`)
    } finally {
      connection.release();
    }
  }

  async delete(productID: string): Promise<Product> {
    try {
      const connection = await pool.connect();
      const sql = "DELETE FROM products WHERE id=$1 RETURNING *";
      const result = await connection.query(sql, [productID]);
      connection.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${productID}. Error:  ${(err as Error).message}`)
    }
  }

}
