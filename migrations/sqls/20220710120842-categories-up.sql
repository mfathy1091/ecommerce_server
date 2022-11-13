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
    (null , 'glasses-lens', 'Glasses Lenses', true, 'https://res.cloudinary.com/dztskndab/image/upload/v1668331490/avatar/y9qwd89u8wyy1empkhyi.jpg'),
    (null , 'sunglasses', 'Sunglasses', true, 'https://res.cloudinary.com/dztskndab/image/upload/v1668330290/avatar/dlfhdv73eyeqvscyc8pq.jpg'),
    (null , 'eyeglasses', 'Eyeglasses', true, 'https://res.cloudinary.com/dztskndab/image/upload/v1668330633/avatar/kmp2klgn1hq2aledtmn8.jpg'),
    (null, 'accessories', 'Accessories', true, 'https://res.cloudinary.com/dztskndab/image/upload/v1668333045/avatar/oprn3wm0jo32qfsh6ehd.jpg')