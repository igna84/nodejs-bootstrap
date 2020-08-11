const bodyParser = require("body-parser");
const cors = require("cors");
const { logger } = require("./logger");

const middlewareList = [
    { name: "bodyParser",   func: bodyParser.urlencoded({extended: true}) }
    , { name: "cors",       func: cors() }
];

module.exports = function( app ) {
    logger.info("middleware initialize.");

    middlewareList.forEach( ( item ) => {
        app.use( item.func );
        logger.info(`${item.name} setting completed.`);
    });

    logger.info("middleware setting completed.");
}