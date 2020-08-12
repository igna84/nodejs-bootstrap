const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const { logger } = require("./logger");

const middlewareList = [
    { name: "bodyParser",   func: bodyParser.urlencoded({extended: true}) }
    , { name: "cors",       func: cors() }
    , { name: "passport",   func: passport.initialize()}
];

module.exports = function( app ) {
    logger.info("middleware initialize.");

    middlewareList.forEach( ( item ) => {
        app.use( item.func );
        logger.info(`${item.name} setting completed.`);
    });

    logger.info("middleware setting completed.");
}