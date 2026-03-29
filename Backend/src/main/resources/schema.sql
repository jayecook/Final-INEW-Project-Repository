DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL);

CREATE TABLE products (
    product_id BIGINT PRIMARY KEY,
    product_type VARCHAR(150) NOT NULL,
    product_amount NUMERIC(10,2) NOT NULL,
    product_count INT NOT NULL,
    threshold INT NOT NULL);
