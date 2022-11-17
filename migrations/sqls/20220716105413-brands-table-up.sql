CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(30) NOT NULL UNIQUE
);



INSERT INTO brands
  (name, slug)
VALUES
  ('Police', 'Police'),
  ('Hoya', 'hoya'),
  ('Fred', 'fred'),
  ('Dior', 'dior'),
  ('Ray Ban', 'ray-ban'),
  ('Levis', 'levis'),
  ('Boss', 'boss')