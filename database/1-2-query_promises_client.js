/*
1.2 EXERCISE 1: CREAR UNA CONSULTA TANTO CON CALLBACK 
COMO CON
PROMISE A UNA TABLA DE UNA DB
*/

//Asincronía: Permite operaciones no bloqueantes, 
//lo cual es ideal para aplicaciones que 
//manejan múltiples usuarios o solicitudes simultáneas.

// Modulo npm node-postgres 
const { Client } = require('pg')

// Datos para la conexión a la base de datos const 
 
// Realizando una consulta para verificar si hay error 
// .query :realizar consultas a bases de datos o a APIs
cliente = new Client({
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321,//5432 
}) 

 // Conectando al cliente
cliente.connect();


// Realizando una consulta para verificar si hay error .
cliente
.query('SELECT NOW() as now')
.then(res => console.log(res.rows[0]))
.catch(e => console.error(e.stack))


// Consulta con promesas 

//Este método envía una consulta SQL al servidor de PostgreSQL.
//query devuelve una promesa. 
cliente.query('SELECT * FROM users')
//Cuando se resuelve, se ejecuta el bloque dentro de then.
.then(res => {
    //res.rows es un array que contiene las filas devueltas por la consulta. 
    console.table(res.rows)
    cliente.end()//cerrando la conexion
})  

//node query_promises_client.js

//node 1-2-query_promises_client.js