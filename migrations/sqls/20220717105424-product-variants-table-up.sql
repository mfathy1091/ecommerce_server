

CREATE TABLE product_variants (
    id SERIAL PRIMARY KEY, 
    sku VARCHAR(30) NOT NULL UNIQUE,
    product_id BIGINT REFERENCES products(id) NOT NULL,
    name VARCHAR(30) NOT NULL UNIQUE, 
    image VARCHAR(255) NOT NULL DEFAULT 'https://res.cloudinary.com/dztskndab/image/upload/v1662985098/avatar/avatar_czgymz.png',
    price NUMERIC(12, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    description VARCHAR NOT NULL
);
