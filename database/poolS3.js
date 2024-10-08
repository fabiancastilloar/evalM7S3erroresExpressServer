// Modulo npm node-postgres 
 
//Datos para la conexión a la base de datos 
// cliente de PostgreSQL para Node.js.
const { Pool } = require('pg');
// Configuración del pool de conexiones
const pool = new Pool({
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321, //5432 
});



module.exports = pool;