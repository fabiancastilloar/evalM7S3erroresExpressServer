


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



// Callback
//console.log('Consulta parametrizada con callback');

// Define la dirección de ordenamiento
const orderDirection = 'DESC';

// Usa backticks para permitir la interpolación de variables
//const text = `SELECT * FROM public.estudiantes ORDER BY apellidos ${orderDirection}`;

// pool.query(text, (err, res) => {
//     if (err) {
//         console.error('Error en la consulta con callback:', err.stack);
//     } else {
//         console.log('Resultados con callback:');
//         console.table(res.rows);
//     }
// });


// Promise
console.log('Consulta parametrizada con promesa');
//const sql = 'SELECT * FROM public.estudiantes WHERE id = $1';
const sql = `SELECT * FROM public.estudiantes ORDER BY apellidos ${orderDirection}`;
//const value = [2]; // Array de valores, seleccionamos el id 2

pool
   // .query(sql, value)
   .query(sql )
    .then(res => {
        console.log('Resultados con promesa:' );
        console.table(res.rows);
    })
    .catch(e => console.error('Error en la consulta con promesa:', e.stack))
    .finally(() => {
        pool.end(); // Cerramos el pool de conexiones al final
    });


    //node evalS3.js