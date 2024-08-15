const mysql = require('mysql2');
const app = require('./app');

const db = mysql.createConnection({
    host: app.database.host || process.env.DB_HOST,
    user: app.database.username || process.env.DB_USERNAME,
    password: app.database.password || process.env.DB_PASSWORD,
    database: app.database.database_name || process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) throw err;
    
    console.log('Connected to MySQL Database.');
});

module.exports = db;
