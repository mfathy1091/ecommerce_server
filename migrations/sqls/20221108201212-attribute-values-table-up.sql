CREATE TABLE attribute_values (
    id SERIAL PRIMARY KEY,    
    attribute_id BIGINT REFERENCES attributes(id) NOT NULL,
    name VARCHAR(30) NOT NULL UNIQUE,
    slug VARCHAR(30) NOT NULL UNIQUE,
    is_active Boolean NOT NULL DEFAULT false,
    image VARCHAR(255)
);
