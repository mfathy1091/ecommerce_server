CREATE TABLE types (
  id SERIAL PRIMARY KEY, 
  "name" VARCHAR(30) NOT NULL UNIQUE,
  slug VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO types
  ("name", slug)
VALUES
  ('Sunglasses', 'sunglasses'),
  ('Eyeglasses', 'eyeglasses')
