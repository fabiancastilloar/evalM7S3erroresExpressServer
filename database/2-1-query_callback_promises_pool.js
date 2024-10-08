/*
2.1 EXERCISE 2: CONSULTA EN UNA CONEXIÓN POOL CON POOL.QUERY()
*/


// Modulo npm node-postgres 

const { Pool } = require('pg') // Datos para la conexión a la base de datos 
const pool = new Pool({

    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321,//5432 

})


// Consulta con callback 
console.log('Consulta con Callback')

//utiliza un pool de conexiones
// para ejecutar una consulta SQL en PostgreSQL 
//seleciona todos los usuarios con id=1
pool.query('SELECT * FROM users WHERE id = 1', (err, res) => {
    if (err) {
        console.log(err.stack)
        pool.end() // Cerrando la conexión 
    } else {
        console.log(res.rows)
    }
})

// Consulta con promises 

console.log('Consulta con Promesas')
// seleciona todos los usuarios con id=1
pool.query('SELECT * FROM users WHERE id = 4')
    .then(res => {
        console.table(res.rows)
        pool.end() // Cerrando la conexión 
    })


    //node query_callback_promises_pool
    //node 2-1-query_callback_promises_pool.js