INSERT INTO products (name, description, price)
VALUES ('Sample Product', 'This is a sample product description', 100);

SELECT * FROM products;

SELECT * FROM products WHERE id = 1;

UPDATE products
SET name = 'Updated Product Name',
    description = 'Updated description',
    price = 150
WHERE id = 1;

DELETE FROM products WHERE id = 1;