const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD ,
        database: process.env.DB_NAME,
    }
);

function getData() {
    return new Promise((success, reject) => {
        connection.query('SELECT * FROM fooditems', (err, rows, cols) => {
            if (err) {
                reject(err);
            } else {
                success(rows);
            }
        });
    });
}

function postData(name, img, price, description) {
    return new Promise((success, reject) => {
        const query = 'INSERT INTO fooditems (item_name, img, price, description) VALUES (?, ?, ?, ?)';
        const values = [name, img, price, description];
        connection.query(query, values, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                success(rows);
            }
        });
    });
}

module.exports = { getData, postData };
