const Sequelize = require("sequelize");
const config = require("./config").DATABASE;

const datasource = null;
const sequelize = {
    datasource
};

module.exports = function() {
    if( null != sequelize.datasource ) {
        return sequelize;
    }
    
    function creationDatasource() {
        return new Sequelize(
            config.SCHEMA
            , config.USERNAME
            , config.PASSWORD
            , config.OPTIONS
        );
    }

    function init() {
        sequelize.datasource = creationDatasource();
    }

    init();

    return sequelize;
};
