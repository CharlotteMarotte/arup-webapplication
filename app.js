const cors = require('cors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var logger = require('morgan');
var audit = require('express-request-audit');
const db = require('./model/queries');

const fs = require('fs').promises; // Import the promise-based version of the fs library

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// log every page request using express-request-audit library
app.use(
  audit({
    auditor: async function (event) {
      // write following data for each page request in file
      let auditData = `timestamp: ${event.response.timestamp} \n method: ${event.request.method} \n URL: ${event.request.url} \n status_code: ${event.response.status_code} \n header-randomValue: ${event.response.headers.random}\n\n`;

      try {
        await fs.appendFile('requestAudit.txt', auditData);
      } catch (error) {
        console.log(error);
      }
    },
    request: {
      maxBodyLength: 50, // limit length to 50 chars + '...'
    },
    response: {
      maxBodyLength: 50, // limit length to 50 chars + '...'
    },
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API',
  });
});
app.get('/products', db.getProducts);
app.get('/products/:id', db.getProductById);
app.post('/products', db.addProduct);
app.put('/products/:id', db.updateProduct);
app.delete('/products/:id', db.deleteProduct);

module.exports = app;
