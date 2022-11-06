DROP TYPE CASE_STATUS CASCADE;

CREATE TYPE CASE_STATUS AS ENUM
    ('active', 'inactive', 'closed');

CREATE TABLE ps_cases (
    id SERIAL PRIMARY KEY, 
    referral_source VARCHAR(50) NOT NULL,
    created_by bigint REFERENCES users(id) NOT NULL,
    assigned_by bigint REFERENCES users(id),
    assigned_to bigint REFERENCES users(id),
    status VARCHAR(50) NOT NULL
);


-- INSERT INTO ps_cases
--     (referral_source, created_by, assigned_by, assigned_to, status)
-- VALUES
--     ('SCI', 1, 1, 1, 'inactive'),
--     ('UNHCR', 1, 1, 1, 'inactive'),
--     ('Community', 1, 1, 1, 'inactive'),
--     ('PSW', 1, 1, 1, 'inactive'),
--     ('SCI', 1, 1, 1, 'inactive'),
--     ('UNHCR', 1, 1, 1, 'inactive'),
--     ('Community', 1, 1, 1, 'inactive'),
--     ('SCI', 1, 1, 1, 'inactive'),
--     ('UNHCR', 1, 1, 1, 'inactive'),
--     ('Community', 1, 1, 1, 'inactive'),
--     ('SCI', 1, 1, 1, 'inactive'),
--     ('UNHCR', 1, 1, 1, 'inactive'),
--     ('Community', 1, 1, 1, 'inactive'),
--     ('SCI', 1, 1, 1, 'inactive'),
--     ('UNHCR', 1, 1, 1, 'inactive'),
--     ('Community', 1, 1, 1, 'inactive')
