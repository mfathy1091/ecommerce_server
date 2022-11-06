CREATE TABLE roles_permissions (
    id SERIAL PRIMARY KEY, 
    role_id bigint REFERENCES roles(id) NOT NULL,
    permission_id bigint REFERENCES permissions(id) NOT NULL
);