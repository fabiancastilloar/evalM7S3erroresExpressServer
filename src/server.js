const http = require('http');
//const pool = require('../database/pool.js');
//const crearCliente = require('../database/conexion_Client.js');

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

const server = http.createServer((req, res) => {
    //Log el método HTTP
    console.log(`Método HTTP: ${req.method}`);

  if (req.method === 'GET' && req.url === '/query-con-parametro') {
        // Parámetros de la consulta
        const id = 1;
        const id2 = 2;

        // Define la dirección de ordenamiento
const orderDirection = 'DESC';
 
        pool.query(`SELECT * FROM public.estudiantes ORDER BY apellidos ${orderDirection}` )
            .then(resH => {
                res.end(JSON.stringify(resH.rows))
                console.table('Usuario:', resH.rows);
            })
            .catch(err => {
                console.error('Error ejecutando la consulta:', err.stack);
            });
    } else if (req.method === 'GET' && req.url === '/query-funcion-asincronica'){

        const obtenerEstudiantes = async () => {
            try {
              const resA = await pool.query('SELECT * FROM estudiantes');
              res.end(JSON.stringify(resA.rows));
              console.log('estudiantes:', resA.rows);
            } catch (err) {
              console.error('Error ejecutando la consulta:', err.stack);
            }
          }
          
          obtenerEstudiantes();
    }
});

//Puerto de escucha del servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//exportar const server
module.exports = server;