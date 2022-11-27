
CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(30) NOT NULL UNIQUE, 
    category_id BIGINT REFERENCES categories(id) NOT NULL,
    brand_id BIGINT REFERENCES brands(id) NOT NULL,
    type_id BIGINT REFERENCES types(id) NOT NULL,
    description VARCHAR NOT NULL,
    is_discontinued BOOLEAN NOT NULL DEFAULT false
);


