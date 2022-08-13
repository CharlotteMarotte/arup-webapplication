// Code thanks to https://www.atatus.com/blog/building-crud-rest-api-with-node-js-express-js-and-postgresql/#setting-up-an-express.js-server

require('dotenv').config();
const Pool = require('pg').Pool;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const pool = new Pool({
  host: DB_HOST || '127.0.0.1',
  user: DB_USER || 'root',
  password: DB_PASS,
  database: DB_NAME || 'products',
  multipleStatements: true,
});

// GET all products
const getProducts = (request, response) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};

// GET product with ID
const getProductById = (request, response) => {
  let productId = parseInt(request.params.id);

  pool.query(
    `SELECT * FROM products WHERE id = ${productId}`,
    (error, results) => {
      if (error) {
        throw error;
      } else if (!results.rows) {
        // products array is empty... no product found
        response
          .status(404)
          .send({ error: `Product with id ${productId} not found` });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

// POST new product
const createProduct = (request, response) => {
  let { name, description, brand, price, image } = request.body;

  pool.query(
    `
    INSERT INTO products (name, description, brand, price, image)
    VALUES ('${name}', '${description}', '${brand}', ${price}, '${image}')`, // add new product
    (error) => {
      if (error) {
        throw error;
      } else {
        pool.query(`SELECT * FROM products`, (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).json(results.rows); // return updated products array (with 201 for "new resource created")
        });
      }
    }
  );
};

// PUT modified product
const updateProduct = (request, response) => {
  let productId = parseInt(request.params.id);
  const { name, description, brand, price, image } = request.body;
  pool.query(
    `SELECT * FROM products WHERE id = ${productId}`, // does product exist?
    (error, results) => {
      if (error) {
        throw error;
      } else if (!results.rows) {
        response
          .status(404)
          .send({ error: `Product with id ${productId} not found` });
      } else {
        pool.query(
          `UPDATE products SET name = '${name}', description = '${description}', brand = '${brand}', 
          price = ${price}, image = '${image}' WHERE id = ${productId}`, // update product
          (error) => {
            if (error) {
              throw error;
            } else {
              pool.query(
                `SELECT * FROM products ORDER BY id`,
                (error, results) => {
                  if (error) {
                    throw error;
                  }
                  response.status(200).json(results.rows); // return updated products array
                }
              );
            }
          }
        );
      }
    }
  );
};

// DELETE product
const deleteProduct = (request, response) => {
  let productId = parseInt(request.params.id);
  pool.query(
    `SELECT * FROM products WHERE id = ${productId}`, // does product exist?
    (error, results) => {
      if (error) {
        throw error;
      } else if (!results.rows) {
        response
          .status(404)
          .send({ error: `Product with id ${productId} not found` });
      } else {
        pool.query(`DELETE FROM products WHERE id = ${productId}`, (error) => {
          // delete product
          if (error) {
            throw error;
          } else {
            pool.query(
              `SELECT * FROM products ORDER BY id`,
              (error, results) => {
                if (error) {
                  throw error;
                }
                response.status(200).json(results.rows); // return updated products array
              }
            );
          }
        });
      }
    }
  );
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
