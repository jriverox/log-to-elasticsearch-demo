const LogManager = require('./LogManager');
const util = require("util");

const logger = new LogManager();

function myMethod(parameters, message) {
    try {
        const hrstart = process.hrtime()
      //codigo de negocio aqui
      const result = parameters.param1 / parameters.param2;
      console.log(result);
      /*
      totalRows es opcional pero es util en caso de que se este procesando un 
      bloque datos, entonces se pudiera utilizar para saber cuantos documento o 
      registros estan asociados al proceso que esta logeando.
      */
      const totalRows = 1000;

      //calcular el tiempo de ejecucion
      const hrend = process.hrtime(hrstart);
      const executionTimeInMS = hrend[0] + hrend[1] / 1e6;
      logger.logInfo(
        'MyClass', //clase o archivo js donde está el metodo
        'myMethod', //metodo u operacion
        parameters,
        `${message}: ${result}`,
        executionTimeInMS, //tiempo de ejecucion de la operación
        'PE', //pais (opcional)
        totalRows // algun numero que indique el tamaño del proceso, numero de filas procesadas, tamaño del archivo, etc (opcional)
      );

      //mostrar mesaje solo por la demo
      console.log('logInfo: Listo');

    } catch (error) {
         
        if (typeof error === 'object' && error !== null)
            console.log("1: ", error.toString());
        else 
            console.log("2: ", error);

        logger.logError(
            'MyClass',
            'myMethod',
            parameters,
            error.message,
            'PE',
            error,
            '',
            ''
          );
        //mostrar mesaje solo por la demo
        //console.log(`logError: error: ${error}`);
    }
}

function generateSimpleError() {
    try {
        throw new Error("se ha generado una excepcion a proposito.");
    } catch (error) {
         
        if (typeof error === 'object' && error !== null)
            console.log("1: ", error.toString());
        else 
            console.log("2: ", error);

        logger.logError(
            'MyClass',
            'myMethod',
            {},
            error.message,
            'PE',
            error,
            '',
            ''
          );
        //mostrar mesaje solo por la demo
        //console.log(`logError: error: ${error}`);
    }
}



//LogInfo test
myMethod({param1:100, param2: 20, param3: new Date()}, "proceso culminado");
//mensaje con enters
myMethod({param1:100, param2: 20, param3: new Date()}, "parrafo 1 \n parrafo 2");
//Log Error test
myMethod();

generateSimpleError();