CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20) NOT NULL UNIQUE, 
    email VARCHAR(30) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    full_name VARCHAR(50),
    role_id BIGINT REFERENCES roles(id),
    avatar_url VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dztskndab/image/upload/v1662985098/avatar/avatar_czgymz.png' NOT NULL,
    refresh_token VARCHAR(255),
    is_active Boolean NOT NULL DEFAULT '0',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- INSERT INTO users
--     (username, email, password, full_name, role_id)
-- VALUES
--     ('adminj', 'adminj@gmail.com', 'pstic12345', 'admin j', 1)