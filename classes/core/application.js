const { logger } = require("./logger");
const config = require("./config");
const fs = require("fs");
const express = require("express");
const app = express();

const middlewareManager = require("./middlewareManager");
const datasource = require("./persistence/datasource");
const passport = require("./passport");
const controller = require("../controller");

let sequelize = null;

module.exports = async function() {
    /**
     * 배너 파일 읽기
     */
    function readBanner() {
        const banner = fs.readFileSync( config.BASIC_PATH + config.BANNER_LOCATION );
        console.log( banner.toString() );
    }

    /**
     * 미들웨어 셋팅
     */
    function setMiddlewareManager() {
        middlewareManager( app );
    }

    /**
     * 데이터 베이스 설정
     */
    async function setSequelize() {
        sequelize = await datasource();
        logger.info("Datasource Creation Complete.");
    }

    /**
     *  인증 전략 수립
     */
    function setPassport() {
        passport( sequelize.model.User, sequelize.model.Auth );
    }

    /**
     *  HTTP Server Create
     */
    function createServer() {
        app.listen( config.PORT, () => {
            logger.info(`Server started on port ${config.PORT}`);
        });
    }

    /**
     *  응답 이후 로깅을 위한 미들웨어 등록
     */
    function setPreHandler() {
        app.use((req, res, next) => {
            logger.info( `${req.method} : ${req.url} : ${res.statusCode}` );
            next();
        });
    }

    /**
     * 초기화 함수
     */
    async function init() {
        readBanner();
        setMiddlewareManager();
        await setSequelize();
        setPassport();

        controller( app, sequelize.model );

        setPreHandler();
        
        createServer();
    }

    await init();
}