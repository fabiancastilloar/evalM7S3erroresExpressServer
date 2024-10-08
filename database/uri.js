// Modulo npm node-postgres 
const { Pool, Client } = require("pg"); 

// URI de conexión en string 
/*
const connectionString = 
'postgresql://node_user:node_password@localhost:5432/db_node' 
*/

const connectionString = 
'postgresql://userr:1234@localhost:5321/db7' 

// conectando con una conexión al pool. 
const pool = new Pool({ connectionString, }) 

pool.query('SELECT NOW()', (err, res) => 
{
 console.log(err, res) 
 pool.end() }) 

 const client = new Client({ 
    connectionString, 
}) 

 client.connect() 

 client.query('SELECT NOW()', (err, res) => { 
    console.log(err, res) 
    client.end()
 })