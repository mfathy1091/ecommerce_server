
CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    product_name VARCHAR(64) NOT NULL UNIQUE, 
    category_id VARCHAR(64) NOT NULL,
    description VARCHAR NOT NULL,
    product_img VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dztskndab/image/upload/v1662985098/avatar/avatar_czgymz.png' NOT NULL,
    price NUMERIC(12, 2) NOT NULL
);


