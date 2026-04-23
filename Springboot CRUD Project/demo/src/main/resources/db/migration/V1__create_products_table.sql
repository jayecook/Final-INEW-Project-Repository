CREATE TABLE if not exists products(
    product_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_type VARCHAR(150) NOT NULL,
    product_amount NUMERIC(10, 2) NOT NULL,
    product_count INTEGER NOT NULL,
    threshold INTEGER NOT NULL
);
