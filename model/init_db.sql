--
-- Drop Table
--
DROP TABLE IF EXISTS products;

--
-- Create Table
--
CREATE TABLE products (
	id serial PRIMARY KEY NOT NULL,
	name varchar(30) NOT NULL,
	description varchar(255) NOT NULL,
	brand varchar(30) NOT NULL,
	price money NOT NULL,
	image varchar(255) NOT NULL
);

--
-- Create Default data
--

INSERT INTO products (name, description, brand, price, image) VALUES ('Happy socks', 'These socks make me happy', 'Socky', 12.55, 'https://cdn.shopify.com/s/files/1/0526/7144/7238/products/socks-size-4547-textile-flying-tiger-copenhagen-164917.png?v=1647536121'), ('Lucky socks', 'These socks bring me luck', 'My socky', 5.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0uIH34bnYNAynucm3J2Z0z3SqJ7un5dGdOQ&usqp=CAU'), ('Warm socks', 'To use in winter', 'Happy sheep', 20, 'https://www.scandinaviastandard.com/wp-content/uploads/2019/11/Warmest-Socks-Etsy-Hand-Knitted-Grey-scandinavia-Standard-2.jpg'), ('Summer socks', 'For warm summer days', 'Summerly', 2.50, 'https://www.fitstore24.com/media/images/org/36490-36490-12400a188cc76a85fcffcccec67b63fc.jpg'), ('Fluffy socks', 'These are for cozy days', 'Home Wear', 8.25, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FHTB1FDsZKb1YBuNjSszeq6yblFXao%2FSocks-for-Women-Winter-Warm-Sleep-Bed-Socks-Floor-Home-Fluffy-Socks-Pure-Color-Female-Soft.jpg&f=1&nofb=1');


