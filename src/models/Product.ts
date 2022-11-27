import pool from '../config/db.config';
import format from 'pg-format'

export type Product = {
  id?: number,
  name: string,
  brand_id: number
  category_id: number,
  type_id: number,
  description: string,
  is_discontinued: boolean,
  images: [any],
  attributeValues: [any]
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
          brands.id as "brandId", brands.name as "brandName",
          categories.id as "categoryId", categories.name as "categoryName",
          types.id as "typeId", types.name as "typeName",
          images_query as images,
          attributes_query as attributes
        FROM products 
        
        LEFT JOIN (
          SELECT 
            product_id,
            json_agg(json_build_object('url', i.url)) images_query
          FROM images i
          GROUP BY product_id
        ) i ON i.product_id = products.id

        LEFT JOIN (
          SELECT 
            product_id,
            json_agg(json_build_object('attributeName', attributes.name, 'attributeValueName', attribute_values.name, 'attributeValueId', attribute_values.id)) attributes_query
          FROM product_attribute_values pav
          INNER JOIN attribute_values 
            ON pav.attribute_value_id = attribute_values.id
          INNER JOIN attributes
            ON attribute_values.attribute_id = attributes.id
          GROUP BY product_id
        ) a ON a.product_id = products.id

        LEFT JOIN brands
          ON products.brand_id = brands.id
        LEFT JOIN categories
          ON products.category_id = categories.id
        LEFT JOIN types
          ON products.type_id = types.id

        WHERE products.id=($1)

      `;

      // json_build_object(
      //   'products', 
      //   json_agg(json_build_object(
      //     'id', products.id, 'name', products.name, 'description', products.description,
      //     'images', images_query
      //   ))
      // )

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
      const sql = "INSERT INTO products (brand_id, category_id, type_id, name, description, is_discontinued) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const result = await connection.query(sql, [product.brand_id, product.category_id, product.type_id, product.name, product.description, product.is_discontinued]);
      const newProduct = result.rows[0];

      let imagesArr = product.images.map((image) => {
        return [newProduct.id, image.url, 'large', 'false']
      })

      const sql2 = format("INSERT INTO images (product_id, url, size, is_featured) VALUES %L RETURNING *", imagesArr);
      const result2 = await connection.query(sql2);
      
      let attributeValues = product.attributeValues.map((attributeValueId) => {
        return [newProduct.id, attributeValueId]
      })

      const sql3 = format("INSERT INTO product_attribute_values (product_id, attribute_value_id) VALUES %L RETURNING *", attributeValues);
      const result3 = await connection.query(sql3);

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
      const sql = "UPDATE products SET brand_id=$1, category_id=$2, type_id=$3, name=$4, description=$5, is_discontinued=$6 WHERE id=$7 RETURNING *";
      const result = await connection.query(sql, [product.brand_id, product.category_id, product.type_id, product.name, product.description, product.is_discontinued, productId]);
      const updatedProduct = result.rows[0];



      await connection.query("DELETE FROM images WHERE product_id=$1", [productId]);
      await connection.query("DELETE FROM product_attribute_values WHERE product_id=$1", [productId]);

      const imagesArr = product.images.map((image) => {
        return [updatedProduct.id, image.url, 'large', 'false']
      })

      const sql2 = format("INSERT INTO images (product_id, url, size, is_featured) VALUES %L RETURNING *", imagesArr);
      const result2 = await connection.query(sql2);
      const images = result2.rows[0]

      let attributeValues = product.attributeValues.map((attributeValueId) => {
        return [updatedProduct.id, attributeValueId]
      })

      const sql3 = format("INSERT INTO product_attribute_values (product_id, attribute_value_id) VALUES %L RETURNING *", attributeValues);
      const result3 = await connection.query(sql3);


      const finalProduct = {
        ...updatedProduct,
        ...images
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
