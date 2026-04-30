CREATE TABLE if not exists products(
    product_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(255) NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    product_price NUMERIC(10, 2) NOT NULL,
    product_count INTEGER NOT NULL,
    threshold INTEGER NOT NULL
);
