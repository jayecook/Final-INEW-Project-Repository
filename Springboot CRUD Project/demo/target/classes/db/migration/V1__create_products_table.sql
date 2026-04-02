CREATE TABLE if not exists products(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(255),
    description varchar(255),
    price Float,
    product_type varchar(255)
);