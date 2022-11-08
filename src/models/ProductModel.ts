import pool from '../config/db.config';
export type Product = {
    id?: number,
    name: string,
    category_id: string,
    description: string,
    image: string,
    is_discontinued: boolean,
}

export default class ProductModel {
    
    async index(query: any): Promise<{}> {
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
            const totalRowsResult = await connection.query(totalRowsSql,  [`%${query.searchKeyword}%`]);

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

    async show(id: string): Promise<Product> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            return result.rows[0];
            connection.release();
        } catch (err) {
            throw new Error(`Could not get products. Error:  ${(err as Error).message}`)
        }
    }

    async create(product: Product): Promise<Product> {
        console.log(product)
        try {
            const connection = await pool.connect();
            const sql = "INSERT INTO products (category_id, name, description, is_discontinued, image) VALUES ($1, $2, $3, $4, $5) RETURNING *";
            const result = await connection.query(sql, [product.category_id, product.name, product.description, product.is_discontinued, product.image]);
            connection.release();
            const newProduct = result.rows[0];
            return newProduct;
        } catch (err) {
            throw new Error(`Could not create product. Error:  ${(err as Error).message}`)
        }
    }

    async update(productId: string, product: Omit<Product, "id">): Promise<Product> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE products SET category_id=$1 name=$2, description=$3, is_discontinued=$4, image=$5 WHERE id=$6 RETURNING *";
            const result = await connection.query(sql, [product.category_id, product.name, product.description, product.is_discontinued, product.image, productId]);
            connection.release();
            const updatedProduct = result.rows[0];
            return updatedProduct;
        } catch (err) {
            throw new Error(`Could not update product. Error:  ${(err as Error).message}`)
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
