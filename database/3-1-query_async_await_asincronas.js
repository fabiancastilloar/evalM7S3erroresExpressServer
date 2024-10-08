//EXERCISE 3: CONSULTAS ASINCRONAS CON ASYNC/AWAIT Y CALLBACK   1

const { Client } = require("pg");

const cliente = new Client({
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321, //5432 
});

// Conectando al cliente
//Define una función asíncrona
async function buscarTodos() {
    try {
        //espera la coneccion con una promesa al cliente a la base de datos. 
        await cliente.connect();
        //respuesta de la promesa
        const res = await cliente.query('SELECT * FROM users');
        
        //desglose de la respuesta linea a linea
        // for (let row of res.rows) {
        //     console.log(row);
        // }
        console.table(res.rows);

        return res; 
    } catch (err) {
        console.error(err);
    } finally {
        //se cierra  la conexión  
        cliente.end();  
    }
}

//buscarTodos(): función para conectarse a la base de datos y obtener los usuarios
//.then(res => :manejar el resultado de la promesa devuelta por buscarTodos()
//res es el valor devuelto por la función
buscarTodos().then(res => console.log("Se mostraron todos los registros de usuarios"));

//query_async_await_asincronas.js

//node 3-1-query_async_await_asincronas.js