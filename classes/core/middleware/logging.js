const { logger } = require("../logger");

module.exports = function( req, res, next ) {
    logger.info( `Called ${req.method} : ${req.url}`);
    next();
}