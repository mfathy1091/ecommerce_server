CREATE TABLE product_attribute_values (
    id SERIAL PRIMARY KEY, 
    product_id BIGINT REFERENCES products(id) NOT NULL,
    attribute_value_id BIGINT REFERENCES attribute_values(id) NOT NULL
);