
import pool from '../config/db.config';
import Order from '../types/order'



export default class OrderModel {
    
    async index(): Promise<Order[]> {
        
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM orders`;
            const result = await connection.query(sql);
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: number): Promise<Order | null> {
        try {
            
            const connection = await pool.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            return result.rows[0];
            connection.release();
        } catch (err) {
            throw new Error(`Could not get orders. Error:  ${(err as Error).message}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            
            const connection = await pool.connect();
            const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
            const result = await connection.query(sql, [order.status, order.user_id]);
            connection.release();
            const newOrder = result.rows[0];
            return newOrder;
        } catch (err) {
            throw new Error(`Could not create Order. Error:  ${(err as Error).message}`)
        }
    }

    async update(id: number, order: Omit<Order, "id">): Promise<Order> {
        try {
            
            const connection = await pool.connect();
            const sql = "UPDATE orders SET status = $1, user_id = $2 WHERE id=$3 RETURNING *";
            const result = await connection.query(sql, [order.status, order.user_id, id]);
            connection.release();
            const updatedOrder = result.rows[0];
            return updatedOrder;
        } catch (err) {
            throw new Error(`Could not update order. Error:  ${(err as Error).message}`)
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            
            const connection = await pool.connect();
            const sql = "DELETE FROM orders WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [id]);
            connection.release();
            const order = result.rows[0];
            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error:  ${(err as Error).message}`)
        }
    }
    async addProduct(orderId: number, productId: number, quantity: number) {
        try {
            const order = await this.show(orderId)
            if(order?.status !== 'open'){
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order?.status}`)
            }else{
                const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
                
                const connection = await pool.connect();
                const result = await connection.query(sql, [quantity, orderId, productId]);
                connection.release();
                const orderProduct = result.rows[0];
                return orderProduct;
            }
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}. Error:  ${(err as Error).message}`)
        }
    }

}
