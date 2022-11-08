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
    (null , 'glasses', 'Glasses', true, null),
    (1 , 'sunglasses', 'Sunglasses', true, 'https://cdn.eyemyeye.com/shared/images/products/S12A2001/S12A2001-1-hd.jpg'),
    (1 , 'eyeglasses', 'Eyeglasses', true, 'https://specials-images.forbesimg.com/imageserve/623cc05f2aeba67e49e8cac5/EyeBuyDirect-Intense-Eyeglasses/960x0.jpg?fit=scale'),
    (null, 'accessories', 'Accessories', true, 'https://cdn.shopify.com/s/files/1/0058/6101/5655/products/eyeglass-charm-pendant-accessory-accessories-icu-eyewear-760_1600x.jpg?v=1629414178')