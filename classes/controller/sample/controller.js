const config = require("../../core/config");
const { logger } = require("../../core/logger");
const ResultObject = require("../../core/http/resultObject");

module.exports = ( model ) => {
    return {
        upload: async ( req, res, next ) => {
            const response = new ResultObject();
            console.log( req.file );
            res.json( response );
            
            next();
        }
    }
}