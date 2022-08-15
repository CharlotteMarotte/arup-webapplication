--
-- Drop Table and Type
--
DROP TABLE IF EXISTS products;

DROP FUNCTION IF EXISTS getallproducts;

DROP FUNCTION IF EXISTS getproductbyid;

DROP PROCEDURE IF EXISTS updateproduct;

DROP PROCEDURE IF EXISTS deleteproduct;

DROP PROCEDURE IF EXISTS addproduct;

DROP PROCEDURE IF EXISTS addclothes;

-- drop type last, because functions depend on it
DROP TYPE IF EXISTS productrowtype;

--
-- Create Table
--
CREATE TABLE products (
	id serial PRIMARY KEY NOT NULL,
	name varchar(30) NOT NULL,
	description varchar(255) NOT NULL,
	brand varchar(30) NOT NULL,
	price numeric (5, 2) NOT NULL,
	image varchar(255) NOT NULL
);

--
-- Create Default data
--
INSERT INTO
	products (name, description, brand, price, image)
VALUES
	(
		'Happy socks',
		'These socks make me happy',
		'Socky',
		12.55,
		'https://cdn.shopify.com/s/files/1/0526/7144/7238/products/socks-size-4547-textile-flying-tiger-copenhagen-164917.png?v=1647536121'
	),
	(
		'Lucky socks',
		'These socks bring me luck',
		'My socky',
		5.50,
		'https://cdn.dedoles.sk/buxus/images/cache/product_gallery_item_fullscreen_icc@3x//vsetko/inspiracie/vesele_ponozky/vysoke_ponozky/vesele_ponozky_stvorlistok_pre_stastie/GMRS166.png.webp'
	),
	(
		'Warm socks',
		'To use in winter',
		'Happy sheep',
		20,
		'https://www.scandinaviastandard.com/wp-content/uploads/2019/11/Warmest-Socks-Etsy-Hand-Knitted-Grey-scandinavia-Standard-2.jpg'
	),
	(
		'Summer socks',
		'For warm summer days',
		'Summerly',
		2.50,
		'https://www.fitstore24.com/media/images/org/36490-36490-12400a188cc76a85fcffcccec67b63fc.jpg'
	),
	(
		'Fluffy socks',
		'These are for cozy days',
		'Home Wear',
		8.25,
		'https://img.joomcdn.net/52738a3ef70ca959da08f1ef85ca2e6016777ad5_1024_1024.jpeg'
	);

--
-- Create type for return of get methods
--
CREATE TYPE productrowtype AS (
	p_id integer,
	p_name character varying(30),
	p_description character varying(255),
	p_brand character varying(30),
	p_price numeric(5, 2),
	p_image character varying(255)
);

--
-- Create stored procedures
--
-- Get all Product
CREATE FUNCTION getallproducts() RETURNS SETOF productrowtype LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY
SELECT
	id,
	name,
	description,
	brand,
	price,
	image
FROM
	products
ORDER BY
	id ASC;

END;

$$;

-- Get Product by ID
CREATE FUNCTION getproductbyid(productid integer) RETURNS SETOF productrowtype LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY
SELECT
	id,
	name,
	description,
	brand,
	price,
	image
FROM
	products
WHERE
	id = productId;

END $$;

-- -- Update Product
Create
OR REPLACE PROCEDURE updateproduct (
	productId INT,
	p_name varchar(30),
	p_description varchar(255),
	p_brand varchar(30),
	p_image varchar(255),
	p_price numeric (5, 2)
) LANGUAGE plpgsql AS $$ BEGIN
UPDATE
	products
SET
	name = p_name,
	description = p_description,
	brand = p_brand,
	price = p_price,
	image = p_image
WHERE
	id = productId;

END $$;

-- -- Delete product
Create
OR REPLACE PROCEDURE deleteproduct (productId INT) LANGUAGE plpgsql AS $$ BEGIN
DELETE FROM
	products
WHERE
	id = productId;

END $$;

-- -- Add product
Create
OR REPLACE PROCEDURE addproduct (
	p_name varchar(30),
	p_description varchar(255),
	p_brand varchar(30),
	p_image varchar(255),
	p_price numeric (5, 2)
) LANGUAGE plpgsql AS $$ BEGIN
INSERT INTO
	products (name, description, brand, image, price)
Values
	(p_name, p_description, p_brand, p_image, p_price);

END $$;


