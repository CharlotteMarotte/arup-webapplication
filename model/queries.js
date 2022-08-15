const { v4: uuidv4 } = require('uuid'); // to create unique IDs to send with header

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

// pg-promise dependencies
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise,
};
var pgp = require('pg-promise')(options);
const cn = {
  host: DB_HOST,
  port: 5432,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
  max: 30, // use up to 30 connections
};
var connectionString = 'postgres://localhost:5432/products';

var db = pgp(cn);

// GET all products
const getProducts = async (request, response) => {
  let randomValue = uuidv4(); // UUID returns 36 character string containing numbers, designed to be globally unique
  try {
    const res = await pool.query('SELECT * FROM getallproducts();');
    // set() function to set the response HTTP header field to random UUID value
    response.set('random', randomValue).status(200).send(res.rows);
  } catch (err) {
    response.status(500).send({
      error: err.message,
    });
  }
};

// GET product with ID
const getProductById = async (request, response) => {
  let productId = parseInt(request.params.id);
  let randomValue = uuidv4(); // UUID returns 36 character string containing numbers, designed to be globally unique
  try {
    const res = await pool.query(`SELECT * FROM getproductbyid(${productId});`);
    if (!res.rows) {
      // products array is empty... no product found
      response
        .status(404)
        .set('random', randomValue)
        .send({
          error: `Product with id ${productId} not found`,
        });
    } else {
      // set() function to set the response HTTP header field to random UUID value
      response.set('random', randomValue).status(200).send(res.rows);
    }
  } catch (err) {
    response.status(500).send({
      error: err.message,
    });
  }
};

// POST new product
const addProduct = async (request, response) => {
  let { name, description, brand, price, image } = request.body;
  let randomValue = uuidv4(); // UUID returns 36 character string containing numbers, designed to be globally unique
  try {
    // use pg-promise with proc function to execute procedure
    await db.proc('addproduct', [name, description, brand, image, price]);
    const res = await pool.query('SELECT * FROM getallproducts();');
    // set() function to set the response HTTP header field to random UUID value
    response.set('random', randomValue).status(200).send(res.rows);
  } catch (err) {
    response.status(500).send({
      error: err.message,
    });
  }
};

// PUT modified product
const updateProduct = async (request, response) => {
  let productId = parseInt(request.params.id);
  const { name, description, brand, price, image } = request.body;
  let randomValue = uuidv4(); // UUID returns 36 character string containing numbers, designed to be globally unique
  try {
    // use pg-promise with proc function to execute procedure

    await db.proc('updateproduct', [
      productId,
      name,
      description,
      brand,
      image,
      price,
    ]);
    const res = await pool.query('SELECT * FROM getallproducts();');
    // set() function to set the response HTTP header field to random UUID value
    response.set('random', randomValue).status(200).send(res.rows);
  } catch (err) {
    response.status(500).send({
      error: err.message,
    });
  }
};

// DELETE product
const deleteProduct = async (request, response) => {
  let productId = parseInt(request.params.id);
  let randomValue = uuidv4(); // UUID returns 36 character string containing numbers, designed to be globally unique

  try {
    await pool.query(`CALL deleteproduct(${productId});`); // update product
    const res = await pool.query('SELECT * FROM getallproducts();');
    // set() function to set the response HTTP header field to random UUID value
    response.set('random', randomValue).status(200).send(res.rows);
  } catch (err) {
    response.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
