CREATE TABLE cart_lines (
  id SERIAL PRIMARY KEY, 
  cart_id bigint REFERENCES carts(id) NOT NULL,
  product_variation_id bigint REFERENCES products(id) NOT NULL,
  quantity smallint NOT NULL DEFAULT 1
);