const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

//credenciales y nueva instancia pool
const pool = new Pool({
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321, //5432 
});

 //procesa las solicitudes entrantes.
 //Cuando se recibe una solicitud en formato JSON, 
 //este middleware lo convierte en un objeto JavaScript
 //(parseo JSON)
app.use(express.json());


// Función para manejar errores
const manejaError = (err, res) => {
    switch (err.code) {
        case '08003':
            res.status(500).json({ error: 'Connection does not exist' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '08006':
            res.status(500).json({ error: 'Connection failure' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '2F002':
            res.status(403).json({ error: 'Modifying SQL data not permitted' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '57P03':
            res.status(503).json({ error: 'Cannot connect now' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42601':
            res.status(400).json({ error: 'Syntax error' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42501':
            res.status(403).json({ error: 'Insufficient privilege' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42602':
            res.status(400).json({ error: 'Invalid name' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42622':
            res.status(400).json({ error: 'Name too long' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42939':
            res.status(400).json({ error: 'Reserved name' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42703':
            //const result = await pool.query('SELECT * FROM estudiantes WHERE columna_NOexiste = 1');
            res.status(400).json({ error: 'Undefined column' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42000':
            res.status(400).json({ error: 'Syntax error or access rule violation' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42P01':
            //cambio sintaxis de columna linea 150
            //const result = await pool.query('SELECT * FROM estudiantes');  por 
            //const result = await pool.query('SELECT * FROM estudiantess');
            res.status(404).json({ error: 'Undefined table' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        case '42P02':
            res.status(400).json({ error: 'Undefined parameter' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        //error no indicado por guia al realizar GET http://localhost:3000/get-student/ninguno
        case '22P02':
            res.status(400).json({ error: ' invalid input syntax for integer' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        //28P01--Password authentication failed for user in DataGrip - cambio usuario DB por uno incorrecto
        case '28P01':
            res.status(400).json({ error: ' Password authentication failed for user in DataGrip' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        //Error: connect ECONNREFUSED al cambiar puerto por port: 5320
        case 'ECONNREFUSED':
            res.status(400).json({ error: ' ECONNREFUSED' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
        //Error no listado o por defecto
        default:
            res.status(500).json({ error: 'Internal Server Error' });
            console.error(`Error : ${err.code} -- ${err.message}`);
            break;
    }
};

// 1. Endpoint: Crear un estudiante
app.post('/crear-estudiante', async (req, res) => {
    const { nombres, apellidos, edad, nro_identidad } = req.body;

    // Simular el error "Reserved name" si el nombre es "user" o uno pre-definido
    const reservedNames = ['user', 'admin', 'postgres'];
    if (reservedNames.includes(nombres.toLowerCase())) {
        const error = new Error('Reserved name');//instanciando un nuevo error (clase)
        error.code = '42939';  // Asignar el código de error
        return manejaError(error, res); // Llama a la función de manejo de errores
    }

    // Simular el error "Invalid name" si el nombre es vacío
    //if (!nombres || typeof nombres !== 'string' || nombres.trim() === '') {
    if (!nombres || typeof nombres !== 'string' || nombres.trim() === '' || /\d/.test(nombres)) {

        const error = new Error('Invalid name');
        error.code = '42602';  // Asignar el código de error
        return manejaError(error, res); // Llama a la función de manejo de errores
    }

    try {
        const result = await pool.query(
            'INSERT INTO estudiantes(nombres, apellidos, edad, nro_identidad) VALUES($1, $2, $3, $4) RETURNING *',
            [nombres, apellidos, edad, nro_identidad]
        );
        res.status(201).json({ message: 'Estudiante creado', student: result.rows[0] });
    } catch (err) {
        manejaError(err, res);
    }
});

// 2. Endpoint: Obtener un estudiante por ID
app.get('/leer-estudiante/:id', async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM estudiantes WHERE id = $1', [studentId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado' });
        }
    } catch (err) {
        manejaError(err, res);
    }
});

// 3. Endpoint: Listar todos los estudiantes
app.get('/leer-todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM estudiantes');
        // const result = await pool.query('SELECT * FROM estudiantess');
        // const result = await pool.query('SELECT * FROM estudiantes WHERE columna_NOexiste = 1');
        res.json(result.rows);
    } catch (err) {
        manejaError(err, res);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});