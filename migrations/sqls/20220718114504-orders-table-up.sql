-- DROP TYPE CASE_STATUS CASCADE;

-- CREATE TYPE CASE_STATUS AS ENUM
--     ('active', 'inactive', 'closed');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY, 
  user_id bigint REFERENCES users(id) NOT NULL,
  -- created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  -- is_online_order
  -- payment_method VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  shipping_address VARCHAR(255),
  order_total NUMERIC(12, 2) NOT NULL
  -- order_status_id VARCHAR(25) NOT NULL DEFAULT 'pending'
);