CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    parent_category_id Integer REFERENCES categories(id),
    slug VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(30) NOT NULL UNIQUE,
    is_active Boolean NOT NULL DEFAULT true,
    image VARCHAR(255)
);



INSERT INTO categories
    (parent_category_id, slug, name, is_active, image)
VALUES
    (null , 'outdoor-led-displayes', 'Outdoor Led Displayes', true, 'https://res.cloudinary.com/dztskndab/image/upload/v1668331490/avatar/y9qwd89u8wyy1empkhyi.jpg'),
    (null , 'indoor-led-displayes', 'Indoor Led Displayes', true, 'https://res.cloudinary.com/dztskndab/image/upload/v1668331490/avatar/y9qwd89u8wyy1empkhyi.jpg'),
    (null , 'controllers', 'Controllers', true, 'https://res.cloudinary.com/dztskndab/image/upload/v1668331490/avatar/y9qwd89u8wyy1empkhyi.jpg')
