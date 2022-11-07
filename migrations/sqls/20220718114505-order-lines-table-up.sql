CREATE TABLE order_lines (
  id SERIAL PRIMARY KEY, 
  order_id bigint REFERENCES orders(id) NOT NULL,
  product_variant_id bigint REFERENCES product_variants(id) NOT NULL,
  quantity NUMERIC NOT NULL,
  total NUMERIC(12, 2) NOT NULL
);