const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'StoreManager',
  password: 'sua_senha_aqui',
  port: 3306,
});

module.exports = connection;