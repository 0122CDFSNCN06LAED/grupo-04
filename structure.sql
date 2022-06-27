CREATE DATABASE bmp;
USE bmp;


CREATE TABLE userCategories (
	id INT NOT NULL AUTO_INCREMENT,
	type VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	userName VARCHAR(50) NOT NULL,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	email VARCHAR(50) UNIQUE NOT NULL,
	cuit INT NOT NULL,
	companyName VARCHAR(50)NOT NULL,
	phoneNumber INT,
	password VARCHAR(80) NOT NULL,
	companyImg VARCHAR(100),
	usercategory_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (usercategory_id) REFERENCES userCategories(id)
	
);

CREATE TABLE brands (
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(50),
	PRIMARY KEY (id)
);

CREATE TABLE productCategories (
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(50),
	description varchar(150),
	PRIMARY KEY (id)
);

CREATE TABLE productSubCategories (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50),
	description VARCHAR(100),
	productCategory_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (productCategory_id) REFERENCES productCategories(id)	
);

CREATE TABLE models (
	id INT NOT NULL AUTO_INCREMENT,
	brand_id INT,
	name VARCHAR(50),
	description VARCHAR(100),
	PRIMARY KEY (id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);


CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	productName VARCHAR(100),
	price FLOAT,
	minBuy INT,
	productImages VARCHAR(100),
	models_id INT,
	PRIMARY KEY (id),
   FOREIGN KEY (models_id) REFERENCES models(id)
);

CREATE TABLE products_productSubCategories (
	id INT NOT NULL AUTO_INCREMENT,
	product_id INT,
	productSubCategories_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (productSubCategories_id) REFERENCES productSubCategories(id)
);

CREATE TABLE productCar (
	id INT NOT NULL AUTO_INCREMENT,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE buyDetail (
	id INT NOT NULL AUTO_INCREMENT,
	product_id INT,
	quantity INT,
	user_id INT,
	operation_id INT,
	price FLOAT,
	PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE favoriteProducts (
	id INT NOT NULL AUTO_INCREMENT,
	product_id INT,
	user_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);