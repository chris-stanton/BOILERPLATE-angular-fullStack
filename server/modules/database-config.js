
////////////////////////////////////////
// DATABASES W/ DEPLOY FILE           //
// Note: SETUP FOR DEPLOY WITH HEROKU //
////////////////////////////////////////

var pg = require('pg');
var url = require('url');
var config = {};

if (process.env.DATABASE_URL) {

  // Heroku gives a url, not a connection object
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth.split(':');
  // for uses with *heroku
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };

} else {
  // for use locally
  config = {
    user: process.env.PG_USER || 'process.env.your_postgres_username', //env var: PGUSER
    password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
    host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
    port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
    database: process.env.DATABASE_NAME || 'process.env.your_database_name', //env var: PGDATABASE
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}


module.exports = new pg.Pool(config);
