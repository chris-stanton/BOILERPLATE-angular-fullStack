var router = require('express').Router();
var pg = require('pg');
var config = {
  database: 'phi',//database name
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 1500
};
var pool = new pg.Pool(config);








module.exports = router;
