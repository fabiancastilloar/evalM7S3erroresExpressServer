// Modulo npm node-postgres 

const { Pool } = require('pg') // Datos para la conexión a la base de datos 
const pool = new Pool({
    /*
    user: 'node_user', host: 'localhost',
    database: 'db_node', 
    password: 'node_password', port: 5432, 
    */
    user: 'userr',
    host: 'localhost',
    database: 'db7',
    password: '1234',
    port: 5321,//5432 

}) // Realizando una consulta para verificar si hay error

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})