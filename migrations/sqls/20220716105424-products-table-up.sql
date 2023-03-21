
CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    
    name VARCHAR(30) NOT NULL UNIQUE, 
    category_id BIGINT REFERENCES categories(id) NOT NULL,
    brand_id BIGINT REFERENCES brands(id) NOT NULL,
    type_id BIGINT REFERENCES types(id),
    description VARCHAR,
    is_discontinued BOOLEAN DEFAULT false,
    pixel_pitch VARCHAR(30),
    module_size VARCHAR(30),
    cabinet_size VARCHAR(30)
);


