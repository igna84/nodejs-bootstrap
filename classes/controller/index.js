const user = require("./user");
const sample = require("./sample");

module.exports = ( app, model ) => {
    user( app, model );
    sample( app, model );
}