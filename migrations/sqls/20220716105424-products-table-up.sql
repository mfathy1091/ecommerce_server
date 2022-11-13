
CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(30) NOT NULL UNIQUE, 
    category_id BIGINT REFERENCES categories(id) NOT NULL,
    brand_id BIGINT REFERENCES brands(id) NOT NULL,
    description VARCHAR NOT NULL,
    image VARCHAR(255) NOT NULL DEFAULT 'https://res.cloudinary.com/dztskndab/image/upload/v1662985098/avatar/avatar_czgymz.png',
    is_discontinued BOOLEAN NOT NULL DEFAULT false
);


