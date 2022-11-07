CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    parent_category_id Integer REFERENCES categories(id),
    "name" VARCHAR(30) NOT NULL UNIQUE,
    is_active Boolean NOT NULL DEFAULT false
);



