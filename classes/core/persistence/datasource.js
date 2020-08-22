const Sequelize = require("sequelize");
const config = require("../config").DATABASE;

const models = require("../../model");

const datasource = null;
const sequelize = {
    datasource
    , model: {}
};

module.exports = function() {
    return new Promise(async (resolve, reject) => {
        if( null != sequelize.datasource ) {
            return sequelize;
        }
        
        /**
         *  DB Connection 생성
         */
        function creationDatasource() {
            return new Sequelize(
                config.SCHEMA
                , config.USERNAME
                , config.PASSWORD
                , config.OPTIONS
            );
        }
    
        /**
         *  모델 생성 등록
         */
        function setModels() {
            sequelize.model = models( sequelize.datasource );
        }
    
        /**
         *  초기화
         */
        async function init() {
            return new Promise( async ( resolve) => {
                sequelize.datasource = creationDatasource();
                setModels();
        
                await sequelize.datasource.sync();
                resolve();
            });
        }
    
        await init();
        resolve( sequelize );
    });
};
