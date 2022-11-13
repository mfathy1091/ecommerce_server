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
  ('Color', 'color'),
  ('Frame Shape', 'frame-shape')
