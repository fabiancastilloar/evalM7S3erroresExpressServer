//EXERCISE 5: CONSULTAS CON OBJETOS




const { Pool } = require("pg"); 

const pool = new Pool({ 
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321, //5432 
})

// Creamos el Objeto 
const query = { 
    text: 'SELECT * FROM users WHERE age > $1', 
    values: [20], 
    rowMode: 'array' // Definiendo modo fila
     
} 
    
    // Realizamos la consulta con el Objeto query 
    
    pool.query(query, (err, res) => { 
        if (err) { 
            console.log(err.stack) 
        } else { 
            console.table(res.rows)
         } 
        })


        //query_object_row_mode.js

        //node 5-query_object_row_mode.js