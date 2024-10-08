
//EXERCISE 4: CONSULTAS PARAMETRIZADAS

const { Pool } = require('pg'); // Datos para la conexión a la base de datos

const pool = new Pool({
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321,//5432 
});

// Callback
console.log('Consulta parametrizada con callback');
// se utiliza para preparar una consulta SQL parametrizada
const text = 'SELECT * FROM users WHERE age > $1';
const values = [30]; // Array de valores, seleccionamos los mayores de 30

/*
pool.query(...):
 método para ejecutar una consulta SQL en la base de datos utilizando una conexión del pool. 
text: La consulta SQL preparada
values:  valores que se utilizarán para reemplazar los marcadores de posición en la consulta
*/

//se usa para evitar inyecciones de sql  

pool.query(text, values, (err, res) => {
    if (err) {
        console.error('Error en la consulta con callback:', err.stack);
    } else {
        console.log('Resultados con callback:' );
        console.table( res.rows);
    }
});

// Promise
console.log('Consulta parametrizada con promesa');
const sql = 'SELECT * FROM users WHERE id = $1';
//const sql = 'SELECT * FROM public.users WHERE id = $1';
const value = [4]; // Array de valores, content:  id 4

pool
    .query(sql, value)
    .then(res => {
        console.log('Resultados con promesa:');
        console.table( res.rows[0]);
    })
    .catch(e => console.error('Error en la consulta con promesa:', e.stack))
    .finally(() => {
        pool.end(); // Cerramos el pool de conexiones al final
    });


    // query_parametrizada.js

    //node 4-query_parametrizada.js