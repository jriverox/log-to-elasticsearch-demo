const request = require('sync-request');
const config = require('./config');
const LogEvent = require('./logEvent');

module.exports = class LogManager {
    constructor() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (dd < 10) {
          dd = `0${dd}`;
        }
        if (mm < 10) {
          mm = `0${mm}`;
        }
        const indexName = `${config.elasticLogging.pattern}${yyyy}.${mm}.${dd}`;
        this.indexName = indexName;
        this.url = `${config.elasticLogging.endpoint}/${indexName}/${config.elasticLogging.type}`;
      }
    
      addLog(logEvent) {
        try {
          logEvent.Application = config.elasticLogging.application;
          if (
            config.elasticLogging.enabledInfo === true ||
            config.elasticLogging.enabledError === true
          ) {
              console.log(this.url);
            const response = request('POST', this.url, { json: logEvent });
            console.log(response);
          }
        } catch (error) {
            console.error('Logging error: ', error);
        }
      }
    
      logInfo(
        className,
        method,
        parameters,
        message,
        elapsedTime,
        country,
        contentLength
      ) {
        let parametersString = '';
        if (typeof parameters === 'object' && parameters !== null)
          parametersString = JSON.stringify(parameters);
        else 
            parametersString = parameters;

        const log = new LogEvent(
          'INFO',
          className,
          method,
          parametersString,
          message,
          elapsedTime,
          country,
          '',
          contentLength,
          '',
          ''
        )
        this.addLog(log);
      }
    
      logError(
        className,
        method,
        parameters,
        message,
        pais,
        exception,
        remoteAddr,
        source = ''
      ) {
            let parametersString
            if (typeof parameters === 'object' && parameters !== null)
                parametersString = JSON.stringify(parameters);
            else 
                parametersString = parameters;
            let exceptionString;
            if (typeof exception === 'object' && exception !== null)
                exceptionString = JSON.stringify(exception.toString());
            else 
                exceptionString = exception;

            const log = new LogEvent(
            'ERROR',
            className,
            method,
            parametersString,
            message,
            0,
            pais,
            exceptionString,
            0,
            remoteAddr,
            source
            );
            this.addLog(log);
        }    
}    