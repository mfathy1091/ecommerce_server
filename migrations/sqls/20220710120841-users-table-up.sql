CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20) NOT NULL UNIQUE, 
    email VARCHAR(30) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    role_id BIGINT REFERENCES roles(id),
    avatar VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dztskndab/image/upload/v1662985098/avatar/avatar_czgymz.png' NOT NULL,
    refresh_token VARCHAR(255),
    is_active Boolean NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

