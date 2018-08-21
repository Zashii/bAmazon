DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products (
	id INTEGER(2) auto_increment,
    -- makes a boolean column called has_pet which cannot contain null
    product_name VARCHAR(50), 
    -- makes a string column called pet-name"
    department_name VARCHAR(50),
    
    price FLOAT (6, 2),
    
    stock_quantity INTEGER(10),
    
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple", "Produce", "1.00", "50");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", "1000.00", "2");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fidgetspinner", "Toy", "2.00", "10");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Furniture", "40.00", "5");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dress", "Clothing", "25.00", "7");

select * from products
