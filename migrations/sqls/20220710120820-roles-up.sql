CREATE TABLE roles (
    id SERIAL PRIMARY KEY, 
    role_name VARCHAR(50) NOT NULL
);


INSERT INTO roles
    (role_name)
VALUES
    ('Admin'), 
    ('User'), 
    ('Supervisor');
