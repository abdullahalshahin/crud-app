const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const { 
    APP_NAME, APP_ENV, APP_KEY, APP_DEBUG, APP_URL, APP_PORT, 
    DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, 
} = process.env;

assert(APP_KEY, 'APP_KEY is required');
assert(APP_URL, 'APP_URL is required');
assert(APP_PORT, 'APP_PORT is required');

module.exports = {
    app_name: APP_NAME, 
    app_env: APP_ENV, 
    app_key: APP_KEY, 
    app_debug: APP_DEBUG, 
    app_url: APP_URL, 
    app_port: APP_PORT, 
    database: {
        connection: DB_CONNECTION, 
        host: DB_HOST, 
        port: DB_PORT, 
        database_name: DB_DATABASE, 
        username: DB_USERNAME, 
        password: DB_PASSWORD, 
    }
};
