require('dotenv').config();
const Pool = require('pg').Pool;
const fs = require('fs');

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

pool.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  let sql = fs.readFileSync(__dirname + '/init_db.sql').toString();
  pool.query(sql, function (err, result) {
    if (err) throw err;
    console.log('Table creation were successful!');

    console.log('Close by pressing CRTL + c');
  });
});
