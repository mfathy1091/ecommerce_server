CREATE TABLE type_attributes (
    id SERIAL PRIMARY KEY, 
    type_id BIGINT REFERENCES types(id) NOT NULL,
    attribute_id BIGINT REFERENCES attributes(id) NOT NULL
);

INSERT INTO type_attributes
  (type_id, attribute_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4)
