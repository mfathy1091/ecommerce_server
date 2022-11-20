CREATE TABLE images (
    id SERIAL PRIMARY KEY, 
    product_id BIGINT REFERENCES products(id) NOT NULL,
    url VARCHAR NOT NULL UNIQUE,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    size VARCHAR(30) NOT NULL
);