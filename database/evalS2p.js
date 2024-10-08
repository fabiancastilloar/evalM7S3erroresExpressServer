/*
EJERCICIO:
Partiendo de la actividad propuesta en el REBOUND EXERCISE del CUE: 
Obtención de información desde una base de datos (I),
donde se insertaron los datos y se realizaron las primeras consultas con rollback y promises, realice lo siguiente:

• Consulta en una conexión Pool con pool.query().
• Consultas asíncronas con ASYNC/AWAIT y callback.
• Consultas parametrizadas.
• Consultas con Objetos.

Las consultas a realizar para cada uno de los ítems anteriores son:
1. Seleccione todos los estudiantes que sean mayores de 25 años.
2. Seleccione todos los estudiantes, y ordene el resultado reflejando el apellido en forma descendente.
3. Seleccione todos los cursos disponibles.

*/

//node evalS2p.js --n 11

const yargs = require('yargs');

let nEjercicio = 0;


// Configurar yargs para obtener un número
const argv = yargs
    .option('nEjercicio', {
        alias: 'n',
        type: 'number',
        description: 'Un número para elegir una acción',
        demandOption: true // hace que el argumento sea obligatorio
    })
    .argv;


//----------------------------------------------------------------------
// 1 Seleccione todos los estudiantes que sean mayores de 25 años.
//----------------------------------------------------------------------

//----------------------------------------------------------------------
// 1.1 Consulta en una conexión Pool con pool.query()
//---------------------------------------------------------------------- 


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

if (argv.nEjercicio == 11) {

    console.log('Ejercicio : ', argv.nEjercicio);
 
    //metodo para ejecutar una consulta SQL en la base de datos utilizando 
    //el Pool de conexiones configurado anteriormente.
    pool.query('SELECT * FROM public.estudiantes WHERE edad > 25', (err, res) => {
        if (err) {
            console.error('Error en la consulta:', err);
        } else {
            console.table(res.rows);
        }
        pool.end();
    });

}



//----------------------------------------------------------------------
// 1.2 Consultas asíncronas con ASYNC/AWAIT  
//----------------------------------------------------------------------

// pg: Este es el módulo que permite interactuar con bases de datos PostgreSQL en Node.js.
//Client: Esta clase representa una conexión individual a la base de datos.
//Client se usa generalmente para establecer una sola conexión a la vez.

//importa la clase Client del módulo pg
const { Client } = require("pg");

//se crea una nueva instancia de la clase Client del módulo pg, 
//que permite conectarse a una base de datos PostgreSQL. 
const cliente = new Client({
    user: 'userr',
    host: 'localhost',
    database: 'db_node',
    password: '1234',
    port: 5321, //5432 
});


if (argv.nEjercicio == 12) {
    console.log('Ejercicio : ', argv.nEjercicio);

    // Conectando al cliente
    async function buscarTodos() {
        try {
            await cliente.connect();

            // Se ejecuta la consulta SQL para seleccionar todos los registros de la tabla estudiantes donde la edad es mayor a 25. 
            const res = await cliente.query('SELECT * FROM public.estudiantes WHERE edad > 25');

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

    //se llama a la funcion
    buscarTodos().then(res => console.log("Se mostraron todos los registros de usuarios \n"));

//.then:  método se utiliza para manejar el resultado de una promesa cuando se resuelve.
//res:  contiene los resultados de la consulta.

}


//----------------------------------------------------------------------
// 1.3 Consultas asíncronas con   callback.
//----------------------------------------------------------------------


if (argv.nEjercicio == 13) {
    console.log('Ejercicio : ', argv.nEjercicio);

    // Función para obtener estudiantes mayores de 25 años  
    const obtenerEstudiantesMayores = (callback) => {

        //Se utiliza $1 a usar equivalente a una interpolacion y para evitar inyecciones SQL
        const query = 'SELECT * FROM public.estudiantes WHERE edad > $1';//consulta
        const values = [25];//valor a interpolar

        //Se pasan la consulta, los valores y un callback para manejar el resultado.
        pool.query(query, values, (err, res) => {
            if (err) {
                return callback(err);
            }
            //null como primer argumento (indicando que no hubo error) y res.rows como segundo argumento. res.rows
            callback(null, res.rows);
        });
    }


    //--------------------------
    obtenerEstudiantesMayores((err, estudiantes) => {
        if (err) {
            console.error('Error al obtener estudiantes mayores:', err.stack);
        } else {
            console.log('Estudiantes mayores de 25 años:');
            console.table(estudiantes);
        }
    });
    //--------------------------
}


//----------------------------------------------------------------------
// 1.4 Consultas parametrizadas.
//----------------------------------------------------------------------

if (argv.nEjercicio == 14) {
    console.log('Ejercicio : ', argv.nEjercicio);
    // Callback
    console.log('Consulta parametrizada con callback');

    //string
    const text = 'SELECT * FROM public.estudiantes WHERE edad > $1';
    const values = [25];  

    pool.query(text, values, (err, res) => {
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
    //const sql = 'SELECT * FROM public.users WHERE id = $1';
    const value = [2]; // Array de valores, seleccionamos el id 4

    //pool.query(...): método utiliza para ejecutar una consulta SQL en la base de datos.
    // value es un arreglo que contiene los valores que se utilizarán en la consulta 
    pool
        .query(sql, value)
        .then(res => {
            console.log('Resultados con promesa:' );
            console.table( res.rows[0]);
        })
        .catch(e => console.error('Error en la consulta con promesa:', e.stack))
        .finally(() => {
            pool.end(); // Cerramos el pool de conexiones al final
        });

}

//----------------------------------------------------------------------
// 1.5 Consultas con Objetos.
//----------------------------------------------------------------------


if (argv.nEjercicio == 15) {
    console.log('Ejercicio : ', argv.nEjercicio);
    // Creamos el Objeto 
    const query = {
        text: 'SELECT * FROM public.estudiantes WHERE edad > $1',
        values: [25],
        //rowMode: 'array' // Definiendo modo fila

    }
 
    // Realizamos la consulta con el Objeto query 
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            //si respuesta no es vacia...
            if (res.rows.length > 0) {
                console.table(res.rows);
            } else {
                console.log('No se encontraron resultados.');
            }
        }
    });

}


//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------
// 2. Seleccione todos los estudiantes, y ordene el resultado reflejando el apellido en forma descendente.
//----------------------------------------------------------------------


//----------------------------------------------------------------------
// 2.1 Consulta en una conexión Pool con pool.query()
//---------------------------------------------------------------------- 

if (argv.nEjercicio == 21) {

    console.log('Ejercicio : ', argv.nEjercicio);

    //'SELECT * FROM public.estudiantes ORDER BY apellidos DESC'

    pool.query('SELECT * FROM public.estudiantes ORDER BY apellidos DESC', (err, res) => {
        if (err) {
            console.error('Error en la consulta:', err);
        } else {
            console.table(res.rows);
        }
        pool.end();
    });

}



//----------------------------------------------------------------------
// 2.2 Consultas asíncronas con ASYNC/AWAIT  
//----------------------------------------------------------------------


if (argv.nEjercicio == 22) {
    console.log('Ejercicio : ', argv.nEjercicio);

    // Conectando al cliente
    async function buscarTodos() {
        try {
            await cliente.connect();
            const res = await cliente.query('SELECT * FROM public.estudiantes ORDER BY apellidos DESC');

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
// 2.3 Consultas asíncronas con   callback.
//----------------------------------------------------------------------


if (argv.nEjercicio == 23) {
    console.log('Ejercicio : ', argv.nEjercicio);

    // Función para obtener estudiantes mayores de 25 años  
    const obtenerEstudiantesMayores = (callback) => {
        // Define la dirección de ordenamiento
        const orderDirection = 'DESC';

        // Construye la consulta
        const query = `SELECT * FROM public.estudiantes ORDER BY apellidos ${orderDirection}`;

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
            console.log('Estudiantes mayores de 25 años:');
            console.table(estudiantes);
        }
    });
    //--------------------------

}


//----------------------------------------------------------------------
// 2.4 Consultas parametrizadas.
//----------------------------------------------------------------------



if (argv.nEjercicio == 24) {
    // Callback
    console.log('Consulta parametrizada con callback');

    // Define la dirección de ordenamiento
    const orderDirection = 'DESC';

    // Usa backticks para permitir la interpolación de variables
    const text = `SELECT * FROM public.estudiantes ORDER BY apellidos ${orderDirection}`;

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
// 2.5 Consultas con Objetos.
//----------------------------------------------------------------------


if (argv.nEjercicio == 25) {
    console.log('Ejercicio : ', argv.nEjercicio);

    // Define la dirección de ordenamiento
    const orderDirection = 'DESC'; //  

    // Creamos el Objeto 
    const query = {
        text: `SELECT * FROM public.estudiantes ORDER BY apellidos ${orderDirection}`,
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


//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------




//----------------------------------------------------------------------
// 3 Seleccione todos los cursos disponibles.
//----------------------------------------------------------------------



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



/*
BEGIN;

INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Juan', 'Pérez', 20, 12345678);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('María', 'García', 22, 87654321);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Carlos', 'López', 19, 11223344);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Sofía', 'Hernández', 21, 44332211);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Pedro', 'Martínez', 23, 56789012);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Lucía', 'Ramírez', 20, 21098765);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Diego', 'Torres', 18, 13579246);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Valentina', 'Sánchez', 24, 24681357);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Andrés', 'Castro', 19, 98765432);
INSERT INTO public.estudiantes (nombres, apellidos, edad, nro_identidad) VALUES ('Camila', 'Mendoza', 22, 12398745);

COMMIT;


select * from public.estudiantes


CREATE TABLE IF NOT EXISTS public.cursos (
   id serial NOT NULL PRIMARY KEY,
   titulo character varying NOT NULL,
   descripcion character varying
);


 

INSERT INTO public.cursos (titulo, descripcion) VALUES ('Curso de Matemáticas', 'Un curso introductorio sobre matemáticas básicas.');
INSERT INTO public.cursos (titulo, descripcion) VALUES ('Curso de Programación', 'Aprende los fundamentos de la programación con JavaScript.');
INSERT INTO public.cursos (titulo, descripcion) VALUES ('Curso de Historia', 'Exploración de los eventos históricos más importantes.');
INSERT INTO public.cursos (titulo, descripcion) VALUES ('Curso de Química', 'Conceptos básicos y experimentos simples en química.');
INSERT INTO public.cursos (titulo, descripcion) VALUES ('Curso de Física', 'Entendiendo los principios fundamentales de la física.');
INSERT INTO public.cursos (titulo, descripcion) VALUES ('Curso de Inglés', 'Mejora tus habilidades de conversación en inglés.');
INSERT INTO public.cursos (titulo, descripcion) VALUES ('Curso de Arte', 'Una introducción a la historia y técnicas del arte.');

 


*/