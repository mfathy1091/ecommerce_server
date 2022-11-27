CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,    
    name VARCHAR(30) NOT NULL UNIQUE,
    slug VARCHAR(30) NOT NULL UNIQUE,
    is_active Boolean NOT NULL DEFAULT false,
    image VARCHAR(255)
);


INSERT INTO attributes
  (name, slug)
VALUES
  ('Material', 'material'),
  ('Frame Color', 'frame-color'),
  ('Frame Shape', 'frame-shape'),
  ('Frame Type', 'frame-type'),
  ('Lenses Color', 'lenses-color'),
  ('Lenses Type', 'lenses-type')