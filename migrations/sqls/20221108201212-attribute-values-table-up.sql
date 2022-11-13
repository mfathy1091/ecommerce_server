CREATE TABLE attribute_values (
    id SERIAL PRIMARY KEY,    
    attribute_id BIGINT REFERENCES attributes(id) NOT NULL,
    name VARCHAR(30) NOT NULL UNIQUE,
    slug VARCHAR(30) NOT NULL UNIQUE,
    is_active Boolean NOT NULL DEFAULT false,
    image VARCHAR(255)
);


INSERT INTO attribute_values
  (attribute_id, name, slug)
VALUES
  ('1', 'Metal', 'metal'),
  ('1', 'Plastic', 'plastic'),
  ('1', 'Mixed', 'mixed'),
  ('1', 'Polycarbonate', 'polycarbonate'),
  ('1', 'Glass', 'glass'),
  ('2', 'Black', 'black'),
  ('2', 'Blue', 'blue'),
  ('2', 'Brown', 'brown'),
  ('2', 'Crystal', 'crystal'),
  ('2', 'Gold', 'gold'),
  ('2', 'Green', 'green'),
  ('2', 'Gray', 'gray'),
  ('2', 'Orange', 'orange'),
  ('2', 'Pink', 'pink'),
  ('2', 'Voilet', 'voilet'),
  ('2', 'White', 'white'),
  ('2', 'Yellow', 'yellow'),
  ('3', 'Aviator', 'aviator'),
  ('3', 'Cat-Eye', 'cat-eye'),
  ('3', 'Rimless', 'rimless'),
  ('3', 'Round', 'round'),
  ('3', 'Square', 'square')
  