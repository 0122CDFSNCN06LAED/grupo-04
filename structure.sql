DROP DATABASE IF EXISTS bmp;
CREATE DATABASE bmp;
USE bmp;

DROP TABLE IF EXISTS userCategories;

CREATE TABLE userCategories (
	id INT NOT NULL,
	type VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE users (
	id INT NOT NULL,
	userName VARCHAR(50) NOT NULL,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	email VARCHAR(50) UNIQUE NOT NULL,
	cuit INT NOT NULL,
	companyName VARCHAR(50)NOT NULL,
	phoneNumber INT,
	password VARCHAR(16) NOT NULL,
	companyImg VARCHAR(100),
	usercategory_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (usercategory_id) REFERENCES userCategories(id)
	
);

CREATE TABLE brands (
	id INT NOT NULL,
	name varchar(50),
	PRIMARY KEY (id)
);

CREATE TABLE products (
	id INT NOT NULL,
	productCategory_id INT NOT NULL,
	productSubCategory_id INT,
	productName VARCHAR(100),
	price FLOAT,
	minBuy INT,
	productImages VARCHAR(100),
	brand_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (brand_id) REFERENCES brands(id),
	FOREIGN KEY (productSubCategory_id) REFERENCES productSubCategories(id)
);


CREATE TABLE productCar (
	id INT NOT NULL,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE buyDetail (
	id INT NOT NULL,
	product_id INT,
	quantity INT,
	user_id INT,
	operation_id INT,
	price FLOAT,
	PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE productCategories (
	id INT NOT NULL,
	name varchar(50),
	description varchar(150),
	PRIMARY KEY (id)
);

CREATE TABLE products_productCategories (
	id INT NOT NULL,
	product_id INT,
	productCategories_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (productCategories_id) REFERENCES productCategories(id)
);

CREATE TABLE favoriteProducts (
	id INT NOT NULL,
	product_id INT,
	user_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);




CREATE TABLE productSubCategories (
	id INT NOT NULL,
	name VARCHAR(50),
	description VARCHAR(100),
	productCategory_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (productCategory_id) REFERENCES productCategories(id)	
);

CREATE TABLE models (
	id INT NOT NULL,
	brand_id INT,
	name VARCHAR(50),
	description VARCHAR(100),
	PRIMARY KEY (id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);