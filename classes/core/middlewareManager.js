const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { logger } = require("./logger");
const requestLogging = require("./middleware/logging");

const middlewareList = [
    { name: "bodyParser"        , func: bodyParser.urlencoded({extended: true}) }
    , { name: "cors"            , func: cors() }
    , { name: "express json"    , func: express.json() }
    , { name: "passport"        , func: passport.initialize()}
    , { name: "requestLogging"  , func: requestLogging}
];

module.exports = function( app ) {
    logger.info("middleware initialize.");

    middlewareList.forEach( ( item ) => {
        app.use( item.func );
        logger.info(`${item.name} setting completed.`);
    });

    logger.info("middleware setting completed.");
}