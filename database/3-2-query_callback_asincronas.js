
//EXERCISE 3: CONSULTAS ASINCRONAS CON ASYNC/AWAIT Y CALLBACK   2



const { Pool } = require("pg");

//se crea un pool de conexiones a una base de datos PostgreSQL
const pool = new Pool({
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321,//5432 
})

/*
pool.connect():método para obtener una conexión del pool. 
Devuelve una promesa 

.then((pool) => {...}):
-el argumento pool en la función de retorno 

pool.query('SELECT * FROM users'):
despues que se establece la conexion,
se puede ejecutar una consulta SQL

*/
pool.connect()
    .then((pool) => {
        pool.query('SELECT * FROM users')
            .then(res => {
                // for (let row of res.rows) { 
                //     console.log(row); 
                // } 

                /*
    res.rows es un array que contiene los resultados de la consulta SQL,
     donde cada elemento es un objeto que representa 
     una fila de la tabla users.
                */
                console.table(res.rows);
            })
            .catch(err => {
                console.error(err);
            })
    })



//query_callback_asincronas.js

//node 3-2-query_callback_asincronas.js