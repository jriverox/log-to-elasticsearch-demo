require("dotenv").config();

module.exports = {
    elasticLogging: {
        endpoint: process.env.ELASTICSEARCH_URL,
        pattern: 'qas-miapp-componente-2-',
        type: 'LogEvent',
        enabledInfo: true,
        enabledError: true,
        application: 'Producer',
    }
}
