/*
EXERCISES QUE TRABAJAREMOS EN
EL CUE:
• EXERCISE 1: CREAR UNA CONSULTA TANTO CON CALLBACK COMO CO N PROMISE A UNA
TABLA DE UNA DB.
• EXERCISE 2: CONSULTA EN UNA CONEXIÓN POOL CON POOL.QUERY().
• EXERCISE 3: CONSULTAS ASINCRONAS CON ASYNC/AWAIT Y CALLBACK.
• EXERCISE 4: CONSULTAS PARAMETRIZADAS.
• EXERCISE 5: CONSULTAS CON OBJETOS.
El objetivo de
este ejercicio es plantear una guía paso a paso para la obtención de datos de un
gestor de base de datos, realiza n do consultas de texto plano, parametrizadas, asíncronas,
consultas parametrizadas, declaraciones preparadas y consultas de modo filas Row Mode
*/

/*
1.1 EXERCISE 1: CREAR UNA CONSULTA TANTO CON CALLBACK COMO CON
PROMISE A UNA TABLA DE UNA DB
*/

//1-1-query_callback_client.js

// Modulo npm node-postgres 
/*importar el objeto Client desde el módulo pg,
para interactuar con bases de datos PostgreSQL 
en Node.js
 */
const { Client } = require('pg')

// Datos para la conexión a la base de datos const 
 
//cliente : almacenará la nueva instancia del objeto Cliente
cliente = new Client({
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321,//5432 
}) 

// Conectando al cliente 
//.connect() método en la clase Cliente
cliente.connect();


// Realizando una consulta para verificar si hay error 
// .query :realizar consultas a bases de datos o a APIs
cliente.query('SELECT NOW() as now', (err, res) => {
 
    if (err) {
        console.log(err.stack)
    } else {
        console.log(res.rows[0])
    }
    //cliente.end() // Cerrando la conexión 
});

// Consulta con callback 
cliente.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.log(err.stack)
    }
    else {
       // console.log(res.rows);
       console.table(res.rows);
        cliente.end() // Cerrando la conexión 
    }
})

//cd database 

//node query_callback_client.js

//node 1-1-query_callback_client.js