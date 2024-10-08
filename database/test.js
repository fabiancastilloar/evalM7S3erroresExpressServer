
//----------------------------------------------------------------------
// 3.1 Consulta en una conexión Pool con pool.query()
//---------------------------------------------------------------------- 

if (argv.nEjercicio == 31) {

    console.log('Ejercicio : ', argv.nEjercicio);

    //'SELECT * FROM cursos'

    pool.query('SELECT * FROM cursos', (err, res) => {
        if (err) {
            console.error('Error en la consulta:', err);
        } else {
            console.table(res.rows);
        }
        pool.end();
    });

}



//----------------------------------------------------------------------
// 3.2 Consultas asíncronas con ASYNC/AWAIT  
//----------------------------------------------------------------------


if (argv.nEjercicio == 32) {
    console.log('Ejercicio : ', argv.nEjercicio);

    // Conectando al cliente
    async function buscarTodos() {
        try {
            await cliente.connect();
            const res = await cliente.query('SELECT * FROM cursos');

            // for (let row of res.rows) {
            //     console.table(row);
            // }

            console.table(res.rows);

            return res;
        } catch (err) {
            console.error(err);
        } finally {
            cliente.end(); // Asegúrate de cerrar la conexión aquí
        }
    }

    buscarTodos().then(res => console.log("Se mostraron todos los registros de usuarios"));

}


//----------------------------------------------------------------------
// 3.3 Consultas asíncronas con   callback.
//----------------------------------------------------------------------


if (argv.nEjercicio == 33) {
    console.log('Ejercicio : ', argv.nEjercicio);

    // Función para obtener estudiantes mayores de 25 años  
    const obtenerEstudiantesMayores = (callback) => {
        // Define la dirección de ordenamiento
        const interpolacion = 'cursos';

        // Construye la consulta
        const query = `SELECT * FROM  ${interpolacion}`;

        pool.query(query, (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, res.rows);
        });
    }

    //--------------------------
    obtenerEstudiantesMayores((err, estudiantes) => {
        if (err) {
            console.error('Error al obtener estudiantes mayores:', err.stack);
        } else {
            console.log('Los cursos son:');
            console.table(estudiantes);
        }
    });
    //--------------------------

}


//----------------------------------------------------------------------
// 3.4 Consultas parametrizadas.
//----------------------------------------------------------------------



if (argv.nEjercicio == 34) {
    // Callback
    console.log('Consulta parametrizada con callback');

    // Define la dirección de ordenamiento
    const interpolacion = 'cursos';

    // Usa backticks para permitir la interpolación de variables
    const text = `SELECT * FROM  ${interpolacion}`;

    pool.query(text, (err, res) => {
        if (err) {
            console.error('Error en la consulta con callback:', err.stack);
        } else {
            console.log('Resultados con callback:');
            console.table(res.rows);
        }
    });

    // Promise
    console.log('Consulta parametrizada con promesa');
    const sql = 'SELECT * FROM public.estudiantes WHERE id = $1';
    const value = [2]; // Array de valores, seleccionamos el id 2

    pool
        .query(sql, value)
        .then(res => {
            console.log('Resultados con promesa:', res.rows[0]);
        })
        .catch(e => console.error('Error en la consulta con promesa:', e.stack))
        .finally(() => {
            pool.end(); // Cerramos el pool de conexiones al final
        });


}

//----------------------------------------------------------------------
// 3.5 Consultas con Objetos.
//----------------------------------------------------------------------


if (argv.nEjercicio == 35) {
    console.log('Ejercicio : ', argv.nEjercicio);

    // Define la dirección de ordenamiento
    const interpolacion = 'cursos'; //  

    // Creamos el Objeto 
    const query = {
        text: `SELECT * FROM  ${interpolacion}`,
        // rowMode: 'array' // Definiendo modo fila (opcional)
    }

    // Realizamos la consulta con el Objeto query 
    pool.query(query.text, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            if (res.rows.length > 0) {
                console.table(res.rows);
            } else {
                console.log('No se encontraron resultados.');
            }
        }
    });


}