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
  ('1', '4', '4'),
  ('1', '5', '5'),
  ('2', '	192*192', '192*192'),
  ('2', '160*160', '160*160'),
  ('3', '	576*576', '	576*576')



  

  -- ('Pixel Pitch', 'pixel_pitch'),
  -- ('Module Size', 'module_size'),
  -- ('Cabinet Size', 'cabinet-size')