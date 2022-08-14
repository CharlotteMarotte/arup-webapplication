--
-- Drop Table
--
DROP TABLE IF EXISTS products;

DROP TYPE IF EXISTS productRowType;

DROP PROCEDURE IF EXISTS GetAllProducts;

DROP PROCEDURE IF EXISTS GetProductById;

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
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FHTB1FDsZKb1YBuNjSszeq6yblFXao%2FSocks-for-Women-Winter-Warm-Sleep-Bed-Socks-Floor-Home-Fluffy-Socks-Pure-Color-Female-Soft.jpg&f=1&nofb=1'
	);

--
-- Create stored procedures
--
CREATE TYPE productRowType as (
	p_id INT,
	p_name varchar(30),
	p_description varchar(255),
	p_brand varchar(30),
	p_price numeric (5, 2),
	p_image varchar(255)
);

-- Get all Product
Create
OR REPLACE FUNCTION GetAllProducts () 
RETURNS SETOF productRowType
LANGUAGE plpgsql 
AS $$ 

BEGIN 
RETURN QUERY
SELECT
	id, name, description, brand, price, image
FROM
	products
ORDER BY
	id ASC
END $$;

-- Get Product by ID
Create
OR REPLACE FUNCTION GetProductById (productId INT) LANGUAGE plpgsql AS $$ BEGIN
SELECT
	*
FROM
	products
WHERE
	id = productId;

END $$;

-- -- Update Product
Create
OR REPLACE PROCEDURE UpdateProduct (
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
OR REPLACE PROCEDURE DeleteProduct (productId INT) LANGUAGE plpgsql AS $$ BEGIN
DELETE FROM
	products
WHERE
	id = productId;

END $$;

-- -- Add product
Create
OR REPLACE PROCEDURE AddProduct (
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