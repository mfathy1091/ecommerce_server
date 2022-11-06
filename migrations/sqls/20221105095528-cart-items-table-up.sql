CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY, 
  cart_id bigint REFERENCES carts(id) NOT NULL,
  product_id bigint REFERENCES products(id) NOT NULL,
  qty smallint NOT NULL DEFAULT 1
);