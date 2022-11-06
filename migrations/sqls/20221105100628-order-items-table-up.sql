CREATE TABLE order_items (
  id SERIAL PRIMARY KEY, 
  order_id bigint REFERENCES orders(id) NOT NULL,
  product_id bigint REFERENCES products(id) NOT NULL,
  qty smallint NOT NULL DEFAULT 1
);